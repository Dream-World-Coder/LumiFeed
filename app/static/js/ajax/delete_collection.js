const deleteCollectionBtns = document.querySelectorAll(".delete_collection");
const collectionGroups = document.querySelectorAll(".collection_group");

// Create a modal dialog
const modal = document.createElement("div");
modal.classList.add("delete-modal");

const modalContent = document.createElement("p");
modalContent.textContent = "Do you want to delete the collection? It cannot be recovered again.";
modalContent.classList.add("modal-content");

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("modal-buttons");

const yesBtn = document.createElement("button");
yesBtn.textContent = "Yes";
yesBtn.classList.add("modal-button", "yes-button");

const noBtn = document.createElement("button");
noBtn.textContent = "No";
noBtn.classList.add("modal-button", "no-button");

buttonContainer.appendChild(yesBtn);
buttonContainer.appendChild(noBtn);
modal.appendChild(modalContent);
modal.appendChild(buttonContainer);
document.body.appendChild(modal);

function sendDeleteRequestToServer(name, index) {
  const url = "/delete_collection";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ collection_name: name }),
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      collectionGroups[index].remove();
      displayMessage(data.message);
    })
    .catch((error) => {
      displayMessage("Error: " + error.message);
    });
}

function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = message;
  document.body.appendChild(messageElement);
  setTimeout(() => messageElement.remove(), 3000);
}

deleteCollectionBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";

    const handleYes = () => {
      modal.style.display = "none";
      const collName = collectionGroups[index].querySelector(".collection_name").textContent;
      console.log(collName);
      sendDeleteRequestToServer(collName, index);
    };

    const handleNo = () => {
      modal.style.display = "none";
    };

    const handleModalClick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    yesBtn.addEventListener("click", handleYes, { once: true });
    noBtn.addEventListener("click", handleNo, { once: true });
    modal.addEventListener("click", handleModalClick, { once: true });
  });
});
