/* ---< ios-height.js >--- */

// Get IOS Window Inner Height
var getIOSWindowHeight = function() {
  // Get Zoom Level of Safari Mobile
  // Zoom detection might not work correctly in other browsers
  // We use width, instead of height, because there are no vertical toolbars
  var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

  // window.innerHeight returns height of the visible area. 
  // We multiply it by zoom and get out real height.
  var retInnerHeight = window.innerHeight * zoomLevel;
  return retInnerHeight;
};

// Get IOS Toolbar Height
var getIOSToolbarHeight = function() {
  if (window.orientation === 0) {
    var toolbarHeight = screen.height - getIOSWindowHeight();
  } else {
    var toolbarHeight = screen.width - getIOSWindowHeight();
  }

  if (toolbarHeight > 1) {
    return toolbarHeight;
  } else {
    return 0;
  }
};