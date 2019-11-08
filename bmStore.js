//array of bookmarks that gets stored with demo content commented out
const bookmarks = [
  /*{
    id: 'x56w',
    title: 'Demo Title 1',
    rating: 3,
    url: 'http://www.title1.com',
    description: 'lorem ipsum dolor sit',
    expanded: false
  },
  {
    id: '6ffw',
    title: 'Demo Title 2',
    rating: 5,
    url: 'http://www.title2.com',
    description: 'dolorum tempore deserunt',
    expanded: false
  } */ 
];
let adding = false;
let error = null;
let filterNum = 0;
//finds bookmark by id
const findById = function (id) {
  return this.bookmarks.find(bookmark => bookmark.id === id);
};
//adds bookmark to store
const addBookmark = function(bookmark){
  bookmark.expanded = false;
  this.bookmarks.push(bookmark);
};
//finds and deletes bookmark by id
const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
};
//sets filter rating
const filterRating = function(rating) {
  this.filterNum = rating;
};
//sets error
const setError = function (error) {
  this.error = error;
};

//exports all relavent functions for other modules to use
export default {
  bookmarks,
  error,
  filterNum,
  findById,
  adding,
  findAndDelete,
  addBookmark,
  filterRating,
  setError,
};