const newCollectionBtn = document.querySelector(".add_new_collection_btn");
const collectionContainer = document.querySelector(".collections_container");

newCollectionBtn.addEventListener("click", () => {
  // Prompt the user for the collection name
  const userInput = prompt("Enter the name for the new collection:");

  // Check if the user entered a name or cancelled the prompt
  if (userInput !== null && userInput.trim() !== "") {
    // Create the outer div
    const collectionGroup = document.createElement("div");
    collectionGroup.className = "collection_group flexed";

    // Create the inner div
    const collection = document.createElement("div");
    collection.className = "collection";

    // Create the collection name div
    const collectionName = document.createElement("div");
    collectionName.className = "collection_name";
    collectionName.textContent = userInput.trim(); // Use the user input here

    // Create the collection content div
    const collectionContent = document.createElement("div");
    collectionContent.className = "collection_content";

    // ul
    const collectionContentUl = document.createElement("ul");

    // span
    const deleteCollectionSpan = document.createElement("span");
    deleteCollectionSpan.className = "delete_collection";
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "static/icons/delete.svg";
    deleteIcon.alt = "delete this collection";
    deleteIcon.setAttribute("srcset", ""); // This sets an empty srcset attribute

    // Nest the elements
    deleteCollectionSpan.appendChild(deleteIcon);
    collectionName.appendChild(deleteCollectionSpan);
    collectionContent.appendChild(collectionContentUl);
    collection.appendChild(collectionName);
    collection.appendChild(collectionContent);
    collectionGroup.appendChild(collection);

    // Append the entire structure to the collection container
    collectionContainer.appendChild(collectionGroup);

    // Alert the user that the collection has been added
    alert("Collection added!");
  } else {
    // Alert the user if they didn't enter a name or cancelled the prompt
    alert("Collection creation cancelled or no name entered.");
  }
});
