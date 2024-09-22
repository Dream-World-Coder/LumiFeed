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
        .then((response) => {
          if (response.status === 401 || response.status === 400) {
            alert("Use different name");
          } else if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            return response.json();
          }
        })
        .then((responseData) => {
          addCollectionToDOM(responseData.new_collection);
          alert("Collection added!");
        })
        .catch((error) => {
          // console.log("Error:", error);
        });
    } else if (userInput.length() > 99) {
      alert("Collection name is too long. Max length is 99 characters.");
    } else {
      alert("Collection creation cancelled or no name entered.");
    }
  });
}

addNewCollection();
