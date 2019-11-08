import bmStore from './bmStore.js';
import api from './api.js';


const generateElementHTML = function(bookmark) {
  let bmHTML = '<ul class="bookmarks">';
  return bmHTML += `
    <li role="listitem" id="${bookmark.id}" class="book">
      <button class="expand" aria-live="polite">+</button>
      <div class="bmTitle">
        <p><span>Title:</span> ${bookmark.title}</p>  
        <p><span>Rating:</span> ${bookmark.rating} Stars</p>
      </div>
      <div class="expand-collapse hidden" aria-live="polite">
        <p class="bmDescription"><span>Description:</span> ${bookmark.desc}</p>
      </div>
      <div class="bmControls">
        <button class="bmWebsite button"><a href="${bookmark.url}" target="_blank">Visit Site</a></button>
        <button class="bmDelete button">Remove</button>
      </div>
    </li>
  </ul>
  `;
};
const generateFormElementHTML = function() {
  let createForm ='<form class="formView">';
  return createForm += `
    <fieldset>
      <div class="top">
        <legend>Create Bookmark</legend>
        <input aria-label="title" class="title" type="text" name="title" placeholder="Title" required>
        <input aria-label="website" class="website" type="url" name="url" placeholder="http://example.com" value="https://" required>
        <input aria-label="description" class="description" role="textbox" type="text" name="desc" placeholder="Enter a desciption">
      </div>
      <div class="bottom" id="rating">
        <p>Bookmark Rating:</p>
        <input aria-label="5-star" class="radio" type="radio" name="rating" value="5-star"> 5-Star
        <input aria-label="4-star" class="radio" type="radio" name="rating" value="4-star"> 4-Star
        <input aria-label="3-star" class="radio" type="radio" name="rating" value="3-star"> 3-Star
        <input aria-label="2-star" class="radio" type="radio" name="rating" value="2-star"> 2-Star  
        <input aria-label="1-star" class="radio" type="radio" name="rating" value="1-star"> 1-Star  
      </div>  
      <input class="formSubmit button" type="submit" value="Submit"></input>
    </fieldset>
        <input class="formClose button" type="button" value="Close"></input>
    </form>
  `;
};

const formRender = function(){
  $('.newForm').html(generateFormElementHTML);
};

const render = function() {
  renderError();
  let bookmarks = [...bmStore.bookmarks];
  
  if (bmStore.filterNum) {
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= bmStore.filterNum);
  }
  const bookmarkListString = generateBookmarkString(bookmarks);
  
  $('.list').html(bookmarkListString);
};

const generateBookmarkString = function(bookmarks) {
  const bookmarkItems = bookmarks.map((bookmark) => generateElementHTML(bookmark));
  return bookmarkItems.join('');
};

const handleAddBookmarkFormClick = function() {
  $('.new').click(event => {
    event.preventDefault();
    formRender();
    $('.new').addClass('hidden');
  });
};

const serializeJson = function(form) {
  const formData = new FormData(form);
  let obj = {};
  formData.forEach((val, name) => obj[name] = val);
  return JSON.stringify(obj);
};

const handleNewBookmarkSubmit = function() {
  $('.newForm').on('submit', 'form', event => {
    event.preventDefault();
    let formElement = $('.formView')[0];
    let newBookmarkName = serializeJson(formElement);
    $('.new').removeClass('hidden');
    $('.formView').addClass('hidden');
    $('.formView')[0].reset();
    api.createBookmark(newBookmarkName)
      .then((newBookmark) => {
        bmStore.addBookmark(newBookmark);          
        render();
      })
      .catch(error => {
        bmStore.setError(error.message);
        renderError();
      });
  });
};

const handleNewBookmarkClose = function() {
  $('.newForm').on('click', '.formClose', event => {
    event.preventDefault();
    $('.formView').addClass('hidden');
    $('.new').removeClass('hidden');
  });
};

const getElementBookmarkID = function(bookmark) {
  return $($(bookmark).closest('.book')).attr('id');
};

const handleDeleteBookmarkClicked = function() {
  $('.list').on('click', '.bmDelete', event => {
    const id = getElementBookmarkID(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        bmStore.findAndDelete(id);
        render();
      })
      .catch((error) => {
        bmStore.setError(error.message);
        render();
      });
  });
};

const handleBookmarkExpandClicked = function() {
  $('.list').on('click', '.expand', event => {
    event.preventDefault();
    let collapse = $(event.target).text();
    if (collapse === '+') {      
      $(event.target).parent().find('.expand-collapse').removeClass('hidden');
      $(event.target).html('-');
    } 
    if (collapse === '-') {
      $(event.target).parent().find('.expand-collapse').addClass('hidden');
      $(event.target).html('+');
     
    }
  });
};

const handleRatingsFilter = function() {
  $('.dropdown').on('change', event => {
    const ratingChosen = $(event.currentTarget).val();
    bmStore.filterRating(ratingChosen);
    render();
  });
};

const generateError = function (message) {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = function () {
  if (bmStore.error) {
    const el = generateError(bmStore.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    bmStore.setError(null);
    renderError();
  });
};


const bindEventListeners = function() {
  handleAddBookmarkFormClick();
  handleNewBookmarkClose();
  handleBookmarkExpandClicked();
  handleNewBookmarkSubmit();
  handleDeleteBookmarkClicked();
  handleRatingsFilter();
  handleCloseError();
};

export default {
  render,
  bindEventListeners
};