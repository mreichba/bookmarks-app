
//validates that there is a name
const validateName = function(title) {
  if (!title) throw new TypeError('Name must not be blank');
};
//validates there is a URL
const validateURL = function(url) {
  if (!url) throw new TypeError('URL must not be blank');
};
//creates new bookmark object
const create = function(title, rating, url, description) {
  return {
    id: cuid(),
    title,
    rating,
    url,
    description,
    expanded: false
  };
};
//exports relavent functions for other modules
export default {
  validateName,
  validateURL,
  create
};