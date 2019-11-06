import cuid from 'cuid';

const validateName = function(title) {
  if (!title) throw new TypeError('Name must not be blank');
};

const validateURL = function(url) {
  if (!url) throw new TypeError('URL must not be blank');
};

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

export default {
  validateName,
  validateURL,
  create
};