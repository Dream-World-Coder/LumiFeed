function createModal() {
    const modal = document.createElement("div");
    modal.classList.add("delete-modal");

    const modalContent = document.createElement("p");
    modalContent.textContent =
        "Do you want to delete the collection? It cannot be recovered again.";
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
    modal.style.display = "none"; // Start hidden

    document.body.appendChild(modal);

    return modal; // Return the modal element
}

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
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                displayMessage(data.error, "error");
                return;
            }
            document.querySelectorAll(".collection_group")[index + 2].remove();
            displayMessage(data.message, "success");
        })
        .catch((error) => {
            displayMessage(error.message, "error");
        });
}

function deleteCollection() {
    const deleteCollectionBtns =
        document.querySelectorAll(".delete_collection");
    const collectionGroups = document.querySelectorAll(".collection_group");

    // Create the modal once and reuse it
    const modal = createModal();
    const yesBtn = modal.querySelector(".yes-button");
    const noBtn = modal.querySelector(".no-button");

    // Attach event listeners for Yes and No buttons
    yesBtn.addEventListener("click", () => {
        modal.style.display = "none";
        const currentCollection = modal.getAttribute("data-current-index");
        const collName = collectionGroups[parseInt(currentCollection) + 2]
            .querySelector(".collection_name")
            .textContent.trim();
        sendDeleteRequestToServer(collName, parseInt(currentCollection));
    });

    noBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // For each delete button, trigger the modal and set data
    deleteCollectionBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            modal.style.display = "flex";
            modal.setAttribute("data-current-index", index); // Pass the current index to modal
        });
    });
}

deleteCollection();
