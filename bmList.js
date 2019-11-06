import bmStore from './bmStore.js'; 
import api from './api.js';

const generateElementHTML = function(bookmark) {
  console.log('generateElementHTML was called!');
  let bmHTML = '<ul class="bookmarks">';
  return bmHTML += `
    <li id="${bookmark.id}" class="book"><button>+</button>
      <div class="bmTitle">
        <p>${bookmark.title}</p>
      </div>
      <div class="expand-collapse hidden">
        <p class="bmDescription">Description</p>
        <p class="bmDescription-text">${bookmark.description}</p>
      </div>
      <div class="bmControls">
        <button class="bmWebsite button">Visit Site</button>
        <button class="bmDelete button">Remove</button>
      </div>
    </li>
  </ul>
  `;
};
// have to set website and remove buttons above still
//below i need to modify render for errors
function render() {
  console.log('render was called!');
  let bookmarks = [...bmStore.bookmarks];
  if (bmStore.filterRating) {
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= bmStore.filterRating);
  }
  const bookmarkListString = generateBookmarkString(bookmarks);
  $('.list').html(bookmarkListString);
}

function generateBookmarkString(bookmarks) {
  const bookmarkItems = bookmarks.map((bookmark) => generateElementHTML(bookmark));
  return bookmarkItems.join('');
}

function handleAddBookmarkFormClick() {

}

function serializeJson(form) {
  const formData = new FormData(form);
  let obj = {};
  formData.forEach((val, name) => obj[name] = val);
  return obj;
}

function handleNewBookmarkSubmit() {

}

function getElementBookmarkID(bookmark) {
  return $(bookmark)
    .closest('.book')
    .data('id');
}

function handleDeleteBookmarkClicked() {

}

function handleBookmarkExpandClicked() {

}

function handleRatingsFilter() {

}

function bindEventListeners() {

}

export 