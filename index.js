//imports all relavent info from other modules
import bmList from './bmList.js';
import bmStore from './bmStore.js';
import api from './api.js';

//gets bookmarks from api and adds them to store and renders them to html
const main = function () {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => bmStore.addBookmark(bookmark));            
      bmList.render();
    });
  bmList.bindEventListeners();
};
//calls main function 
$(main);
