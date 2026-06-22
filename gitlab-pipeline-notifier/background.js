chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "PIPELINE_DONE") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png", // add a 128x128 icon file
            title: "GitLab Pipeline Finished",
            message: `Pipeline ${message.status.toUpperCase()}`
        });
    }
});
