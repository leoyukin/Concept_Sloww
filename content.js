chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "play") {
        const video = document.querySelector("video");
        if (video) {
            video.playbackRate = message.speed;
            video.preservesPitch = false;
            sendResponse({ success: true });
        }
    }
    if (message.action === "reverb") {
        const audio = document.querySelector("audio");
        if (audio) {
            audio.preservesPitch = false;
            audio.playbackRate = message.speed;
            sendResponse({ success: true });
        }
    }
});
