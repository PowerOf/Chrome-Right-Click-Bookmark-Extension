// chrome.runtime.onInstalled.addListener(function() {
//   chrome.contextMenus.create({
//     id: "saveBookmark",
//     title: "Save Bookmark",
//     contexts: ["link"]
//   }, () => {
//     if (chrome.runtime.lastError) {
//       console.error(chrome.runtime.lastError.message);
//     } else {
//       console.log('Context menu created.');
//     }
//   });
// });

chrome.contextMenus.create({
  title: "Save Bookmark",
  contexts: ["link"],
  onclick: function(info, tab) {
    chrome.tabs.executeScript({
      code: 'lastRightClickedLinkTitle'
    }, function(selection) {
      const linkTitle = selection[0];
      const url = info.linkUrl;

      chrome.bookmarks.create({
        'parentId': "1",
        'title': linkTitle || 'Untitled',
        'url': url
      }, function(bookmark) {
        console.log(`Bookmark created with title: ${linkTitle}`);
        // Notification code can go here.
        showNotification(`Bookmark for ${title} saved successfully!`);
      });
    });
  }
});

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "saveBookmark") {
//     const url = info.linkUrl;
//     const title = info.selectionText || 'Untitled1';

//     chrome.bookmarks.create({
//       'parentId': "1", // ID for the bookmarks bar
//       'index': 0, // Place it at the beginning
//       'title': title,
//       'url': url
//     }, (bookmark) => {
//       if (chrome.runtime.lastError) {
//         console.error(chrome.runtime.lastError.message);
//       } else {
//         console.log('Bookmark created:', bookmark);
//         showNotification(`Bookmark for ${title} saved successfully!`);
//       }
//     });
//   }
// });




function showNotification(message) {
  chrome.notifications.create(
    'bookmarkSaved',  // Optional: Notification ID
    {
    type: 'basic',
    title: 'Bookmark Saved',
    message: message
    },
  function(notificationId) {
    console.log('Notification shown:', notificationId);
  }
  );
}