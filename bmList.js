


const generateElementHTML = function(bookmark) {
  console.log('generateElementHTML was called!');
  let bmHTML = '<ul class="bookmarks">'
  return bmHTML += `
  <ul class="bookmarks">
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
function render() {
  console.log('render was called!');

}