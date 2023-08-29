chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "saveBookmark",
      title: "Save Bookmark",
      contexts: ["link"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveBookmark") {
      const url = info.linkUrl;
      const title = info.selectionText || 'Untitled';
  
      chrome.bookmarks.create({
        'parentId': "1", // 1 is the ID for the bookmarks bar, you can adjust as needed
        'title': title,
        'url': url
      });
    }
  });
  