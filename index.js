import bmList from './bmList.js';
// import api from './api.js';
import bmStore from './bmStore.js';




// import shoppingList from './shopping-list';
// import store from './store';
// import api from './api';


//if someone clicks new bookmark log out new bookmark button clicked!
//property of state to control weather we see form or not
//if render is called and that property is true we should see the form
const main = function () {
  bmList.bindEventListeners();
  bmList.render();
};
  
$(main);
  