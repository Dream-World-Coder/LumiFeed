const deleteCollectionBtns = document.querySelectorAll(".delete_collection");
const collectionGroups = document.querySelectorAll(".collection_group");

// Create a modal dialog
const modal = document.createElement("div");
modal.style.cssText = `
                          position: fixed;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          background-color: white;
                          color: black;
                          padding: 20px;
                          border-radius: 5px;
                          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                          z-index: 1000;
                          display: none;
                        `;
const modalContent = document.createElement("p");
modalContent.textContent = "Do you want to delete the collection? It cannot be recovered again.";

const yesBtn = document.createElement("button");
yesBtn.textContent = "Yes";
yesBtn.style.marginRight = "10px";

const noBtn = document.createElement("button");
noBtn.textContent = "No";

modal.appendChild(modalContent);
modal.appendChild(yesBtn);
modal.appendChild(noBtn);
document.body.appendChild(modal);

function sendDeleteRequestToServer(name) {
  url = "/delete_collection";
  options = {
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
      } else {
        return response.json();
      }
    })
    .then((data) => {
      collectionGroups[index + 2].remove();
      alert(data.message);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

deleteCollectionBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";

    const handleYes = () => {
      modal.style.display = "none";
      let collName = collectionGroups[index + 2].querySelector(".collection_name").textContent;
      sendDeleteRequestToServer(collName);
      cleanup();
    };

    const handleNo = () => {
      modal.style.display = "none";
      cleanup();
    };

    const cleanup = () => {
      yesBtn.removeEventListener("click", handleYes);
      noBtn.removeEventListener("click", handleNo);
    };

    yesBtn.addEventListener("click", handleYes);
    noBtn.addEventListener("click", handleNo);
  });
});
