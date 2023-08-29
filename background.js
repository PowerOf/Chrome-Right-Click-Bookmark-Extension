console.log('Background service worker script loaded.');

chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed. Setting up context menu.');
  chrome.contextMenus.create({
    id: "saveBookmark",
    title: "Save Bookmark",
    contexts: ["link"]
  });
  console.log('Context menu setup complete.');
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log('Context menu item clicked.');
  if (info.menuItemId === "saveBookmark") {
    console.log('Save Bookmark selected.');
    const url = info.linkUrl;
    const title = info.selectionText || 'Untitled';
    console.log(`URL: ${url}, Title: ${title}`);

    chrome.bookmarks.create({
      'parentId': "1",
      'title': title,
      'url': url
    }, function(bookmark) {
      console.log('Bookmark created:', bookmark);
    });
  }
});
