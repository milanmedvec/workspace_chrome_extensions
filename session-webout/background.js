const PREDEFINED_TABS = [
  "https://mail.google.com/mail/u/0/#inbox",
  "https://calendar.google.com/calendar/u/0/r",
  "https://docs.google.com/spreadsheets/d/1MZEKZ-OBvXEae8aD23Y_3EvMm9eekhceHv2jwHY6e2g/edit?gid=1236994819#gid=1236994819",
  "https://linear.app/webout/inbox",
  "https://app.notion.com/",
  "https://gitlab.com/webout-spark",
  "https://github.com/",
];

chrome.action.onClicked.addListener(async () => {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });

    if (tabs.length === 0) return;

    const firstTab = tabs[0];
    const otherTabs = tabs.slice(1);

    // Close all tabs except the first one
    const otherTabIds = otherTabs.map(tab => tab.id);
    if (otherTabIds.length > 0) {
      await chrome.tabs.remove(otherTabIds);
    }

    // Replace the first tab with the first predefined URL
    await chrome.tabs.update(firstTab.id, {
      url: PREDEFINED_TABS[0],
      pinned: true
    });

    // Open the rest as pinned tabs
    for (let i = 1; i < PREDEFINED_TABS.length; i++) {
      await chrome.tabs.create({
        url: PREDEFINED_TABS[i],
        pinned: true,
        index: i
      });
    }

  } catch (error) {
    console.error("Error resetting tabs:", error);
  }
});
