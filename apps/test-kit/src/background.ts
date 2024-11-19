console.log('Service Worker (TS) Loaded');

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});
