function addCollectionToDOM(newCollection) {
  const collectionContainer = document.querySelector(".collections_container");

  const parser = new DOMParser();
  const doc = parser.parseFromString(newCollection, "text/html");
  // Extract the first element from the parsed HTML document
  const newCollectionNode = doc.body.firstChild;

  collectionContainer.appendChild(newCollectionNode);
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
          name: userInput,
        }),
      };

      fetch(url, options)
        .then((response) => {
          if (response.status === 401) {
            displayMessage("Please login to save articles");
          } else if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            return response.json();
          }
        })
        .then((responseData) => {
          if (responseData.error) {
            alert("some error occurred");
          } else {
            addCollectionToDOM(responseData.new_collection);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      alert("Collection added!");
    } else if (userInput.length > 99) {
      alert("Collection name is too long. Max length is 99 characters.");
    } else {
      alert("Collection creation cancelled or no name entered.");
    }
  });
}

addNewCollection();
