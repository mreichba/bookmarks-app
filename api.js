const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mason';

const listApiFetch = function(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        // Valid HTTP response but non-2xx status - let's create an error!
        error = { code: res.status };
      }
    
      // In either case, parse the JSON stream:
      return res.json();
    })
    
    .then(data => {
      // If error was flagged, reject the Promise with the error object
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
    
      // Otherwise give back the data as resolved Promise
      return data;
    });
};

const getBookmarks = function(){
  return listApiFetch(`${BASE_URL}/bookmarks`);
};
  
const createBookmark = function(newBookmarkName) {
  let newData = JSON.stringify(newBookmarkName);
  return listApiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: newData
  });
};

const deleteBookmark = function(id){
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  });
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark
};