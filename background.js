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