let lastRightClickedLinkTitle = null;

document.addEventListener("contextmenu", function(event) {
  const closestLinkElement = event.target.closest('a');
  if (closestLinkElement) {
    lastRightClickedLinkTitle = closestLinkElement.innerText || closestLinkElement.getAttribute('title');
  }
});