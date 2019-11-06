
const bookmarks = [
  {
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
  }  
];
let adding = false;
let error = null;
let filter = 0;

const findById = function (id) {
  return this.bookmarks.find(bookmark => bookmark.id === id);
};

const addBookmark = function(bookmark){
  bookmark.expanded = false;
  this.bookmarks.push(bookmark);
};

const findAndUpdate = function (id, newData) {
  const bookmark = this.findById(id);
  Object.assign(bookmark, newData);
};

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
};

const toggleExpand = function(id, expanded){
  const bookmark = this.findById(id);
  bookmark.expanded = expanded;
};

const filterRating = function(rating) {
  this.filterRating = rating;
}


export default {
  bookmarks,
  error,
  filter,
  findById,
  adding,
  findAndDelete,
  findAndUpdate,
  addBookmark,
  toggleExpand,
  filterRating
};