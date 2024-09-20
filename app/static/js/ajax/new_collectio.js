const newCollectionBtn = document.querySelector(".add_new_collection_btn");
const collectionContainer = document.querySelector(".collections_container");
newCollectionBtn.addEventListener("click", () => {
  // Create the outer div
  const collectionGroup = document.createElement("div");
  collectionGroup.className = "collection_group flexed";
  // Create the inner div
  const collection = document.createElement("div");
  collection.className = "collection";
  // Create the collection name div
  const collectionName = document.createElement("div");
  collectionName.className = "collection_name";
  collectionName.textContent = "Coll 1";
  // Create the collection content div
  const collectionContent = document.createElement("div");
  collectionContent.className = "collection_content";
  const collectionContentUl = document.createElement("ul");
  // Nest the elements
  collectionContent.appendChild(collectionContentUl);
  collection.appendChild(collectionName);
  collection.appendChild(collectionContent);
  collectionGroup.appendChild(collection);
  // Append the entire structure to a parent element in your document
  alert("Collection added!");
  collectionContainer.appendChild(collectionGroup);
});
