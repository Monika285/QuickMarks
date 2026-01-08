const titleInput = document.getElementById("titleInput");
const urlInput = document.getElementById("urlInput");
const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");
const bookmarksList = document.getElementById("bookmarksList");

function loadBookmarks() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmarks(list) {
  localStorage.setItem("bookmarks", JSON.stringify(list));
}

function renderBookmarks() {
  const bookmarks = loadBookmarks();
  bookmarksList.innerHTML = ""; // Clear existing bookmarks

  bookmarks.forEach((bookmark, index) => {
    // Create bookmark card container
    const card = document.createElement("div");
    card.classList.add("bookmark-card");

    // Bookmark information
    card.innerHTML = `
      <div class="bookmark-info">
        <h3>${bookmark.title}</h3>
        <p class="category">${bookmark.category}</p>
      </div>
      <div class="bookmark-actions">
        <button class="open-btn">Open</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Open button functionality
    const openBtn = card.querySelector(".open-btn");
    openBtn.addEventListener("click", () => {
      window.open(bookmark.url, "_blank");
    });

    // Delete button functionality
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      bookmarks.splice(index, 1);
      saveBookmarks(bookmarks);   
      renderBookmarks();          
    });

    // Append card to container
    bookmarksList.appendChild(card);
  });
}

addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const url = urlInput.value.trim();
  const category = categoryInput.value.trim();

  
  if (!title || !url || !category) {
    alert("Please fill in all fields!");
    return;
  }

  const newBookmark = { title, url, category };

  const bookmarks = loadBookmarks();
  bookmarks.push(newBookmark);   
  saveBookmarks(bookmarks);      

  titleInput.value = "";
  urlInput.value = "";
  categoryInput.value = "";

  renderBookmarks(); 
});

document.addEventListener("DOMContentLoaded", renderBookmarks);

