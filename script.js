// -----------------------------
// Select Required UI Elements
// -----------------------------
const titleInput = document.getElementById("titleInput");
const urlInput = document.getElementById("urlInput");
const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");
const bookmarksList = document.getElementById("bookmarksList");

// -----------------------------
// Load Existing Bookmarks
// -----------------------------
function loadBookmarks() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

// -----------------------------
// Save Updated Bookmarks
// -----------------------------
function saveBookmarks(list) {
  localStorage.setItem("bookmarks", JSON.stringify(list));
}

// -----------------------------
// Render All Bookmarks in the UI
// -----------------------------
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
      bookmarks.splice(index, 1); // Remove bookmark
      saveBookmarks(bookmarks);   // Save updated list
      renderBookmarks();          // Re-render UI
    });

    // Append card to container
    bookmarksList.appendChild(card);
  });
}

// -----------------------------
// Add New Bookmark
// -----------------------------
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const url = urlInput.value.trim();
  const category = categoryInput.value.trim();

  // Validation
  if (!title || !url || !category) {
    alert("Please fill in all fields!");
    return;
  }

  const newBookmark = { title, url, category };

  const bookmarks = loadBookmarks();
  bookmarks.push(newBookmark);   // Add new bookmark
  saveBookmarks(bookmarks);      // Save updated list

  // Clear input fields
  titleInput.value = "";
  urlInput.value = "";
  categoryInput.value = "";

  renderBookmarks(); // Refresh UI
});

// -----------------------------
// Auto-Load Existing Bookmarks on Page Load
// -----------------------------
document.addEventListener("DOMContentLoaded", renderBookmarks);
