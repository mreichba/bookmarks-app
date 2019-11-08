import bmStore from './bmStore.js';
import bmItem from './bmItem.js';


const generateElementHTML = function(bookmark) {
  let bmHTML = '<ul class="bookmarks">';
  return bmHTML += `
    <li id="${bookmark.id}" class="book">
      <button class="expand">+</button>
      <div class="bmTitle">
        <p>${bookmark.title}  Rating: ${bookmark.rating} Stars</p>
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
const generateFormElementHTML = function() {
  let createForm ='<form class="formView">';
  return createForm += `
    <fieldset>
      <div class="top">
        <legend>Create Bookmark</legend>
        <input class="title" type="text" name="title" placeholder="Title">
        <input class="website" type="text" name="website" placeholder="http://example.com">
        <input class="description" type="text" name="description" placeholder="Enter a desciption">
      </div>
      <div class="bottom">
        <p>Bookmark Rating:</p>
        <input class="radio" type="radio" name="rating" value="5-star"> 5-Star<br>
        <input class="radio" type="radio" name="rating" value="4-star"> 4-Star<br>
        <input class="radio" type="radio" name="rating" value="3-star"> 3-Star<br>
        <input class="radio" type="radio" name="rating" value="2-star"> 2-Star<br>  
        <input class="radio" type="radio" name="rating" value="1-star"> 1-Star<br>   
      </div>  
      <input class="formSubmit button" type="submit" value="Submit"></input>
    </fieldset>
        <input class="formClose button" type="button" value="Close"></input>
    </form>
  `;
};

function formRender(){
  $('.newForm').html(generateFormElementHTML);
}

function render() {
  let bookmarks = [...bmStore.bookmarks];
  
  if (bmStore.filterNum) {
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= bmStore.filterNum);
  }
  const bookmarkListString = generateBookmarkString(bookmarks);
  
  $('.list').html(bookmarkListString);
}

function generateBookmarkString(bookmarks) {
  const bookmarkItems = bookmarks.map((bookmark) => generateElementHTML(bookmark));
  return bookmarkItems.join('');
}

function handleAddBookmarkFormClick() {
  $('.new').click(event => {
    event.preventDefault();
    formRender();
    $('.new').addClass('hidden');
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  let obj = {};
  formData.forEach((val, name) => obj[name] = val);
  return obj;
}

function handleNewBookmarkSubmit() {
  // console.log('handle submit called!');
  $('.newForm').on('submit', 'form', event => {
    // console.log('this called!');
    event.preventDefault();
    let formElement = $('.formView')[0];
    // console.log(formElement);
    let newBookmarkName = serializeJson(formElement);
    $('.new').removeClass('hidden');
    $('.formView').addClass('hidden');
    $('.formView')[0].reset();
    const newMark = bmItem.create(newBookmarkName);
    bmStore.addBookmark(newMark);  
    console.log(bmStore);        
    render();
  });
}

function handleNewBookmarkClose() {
  $('.newForm').on('click', '.formClose', event => {
    event.preventDefault();
    $('.formView').addClass('hidden');
    $('.new').removeClass('hidden');
  });
}

function getElementBookmarkID(bookmark) {
  return $($(bookmark).closest('.book')).attr('id');
}

function handleDeleteBookmarkClicked() {
  $('.list').on('click', '.bmDelete', event => {
    console.log('remove called!');
    const id = getElementBookmarkID(event.currentTarget);
    console.log(id);
    bmStore.findAndDelete(id);
    render();
  });
}

function handleBookmarkExpandClicked() {
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
}

function handleRatingsFilter() {
  $('.dropdown').on('change', event => {
    const ratingChosen = $(event.currentTarget).val();
    bmStore.filterRating(ratingChosen);
    render();
  });
}

// const generateError = function (message) {
//   return `
//       <section class="error-content">
//         <button id="cancel-error">X</button>
//         <p>${message}</p>
//       </section>
//     `;
// };

// const renderError = function () {
//   if (store.error) {
//     const el = generateError(store.error);
//     $('.error-container').html(el);
//   } else {
//     $('.error-container').empty();
//   }
// };

function bindEventListeners() {
  handleAddBookmarkFormClick();
  handleNewBookmarkClose();
  handleBookmarkExpandClicked();
  handleNewBookmarkSubmit();
  handleDeleteBookmarkClicked();
  handleRatingsFilter();
}

export default {
  render,
  bindEventListeners
};