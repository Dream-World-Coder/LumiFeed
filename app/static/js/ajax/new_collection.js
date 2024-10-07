function addCollectionToDOM(newCollection) {
  const collectionContainer = document.querySelector(".collections_container");

  const parser = new DOMParser();
  const doc = parser.parseFromString(newCollection, "text/html");
  // Extract the first element from the parsed HTML document
  const newCollectionNode = doc.body.firstChild;

  if (newCollectionNode) {
    collectionContainer.appendChild(newCollectionNode);
  } else {
    console.error("Failed to parse new collection HTML.");
  }
}

function addNewCollection() {
  const newCollectionBtn = document.querySelector(".add_new_collection_btn");
  newCollectionBtn.addEventListener("click", () => {
    const userInput = prompt("Enter the name for the new collection:");

    if (userInput !== null && userInput.trim() !== "") {
      const url = "/add_new_collection";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInput.trim(),
        }),
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            addCollectionToDOM(res.success);
            displayMessage("Collection added!");
          } else {
            displayMessage(res.error);
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    } else if (userInput.length > 99) {
      displayMessage("Collection name is too long. Max length is 99 characters.");
    } else {
      displayMessage("Collection creation cancelled or no name entered.");
    }
  });
}

addNewCollection();
