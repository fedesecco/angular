chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'checkTab') {
        chrome.tabs.query({}, (tabs) => {
            let found = false;
            for (let tab of tabs) {
                if (tab.url && tab.url.includes(message.url)) {
                    found = true;
                    break;
                }
            }
            sendResponse({ found });
        });
        return true;
    }
});
