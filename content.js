let audioctx = null;
let source = null;
let delayNode = null;
let feedbackGain = null;
let wetGain = null;
let dryGain = null;

function initAudio(video) {
    if (audioctx) return;

    audioctx = new (window.AudioContext || window.webkitAudioContext)();

    source = audioctx.createMediaElementSource(video);

    delayNode = audioctx.createDelay();
    feedbackGain = audioctx.createGain();
    wetGain = audioctx.createGain();
    dryGain = audioctx.createGain();

    delayNode.delayTime.value = 0.08;

    feedbackGain.gain.value = 0.4;

    wetGain.gain.value = 0.0;

    dryGain.gain.value = 1.0;


    source.connect(dryGain);
    dryGain.connect(audioctx.destination);

    source.connect(delayNode);

    delayNode.connect(feedbackGain);
    feedbackGain.connect(delayNode);

    delayNode.connect(wetGain);
    wetGain.connect(audioctx.destination);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "play") {
        const video = document.querySelector("video");
        if (video) {
            initAudio(video)
            video.playbackRate = message.speed;
            video.preservesPitch = false;
            sendResponse({ success: true });
        }
    }
    if (message.action === "reverb") {
        const video = document.querySelector("video");
        if (video) {
            initAudio(video);
            if (wetGain) {
                wetGain.gain.value = message.reverb;
            }
            if (audioctx && audioctx.state === 'suspended') {
                audioctx.resume();
            }
            sendResponse({ success: true });
        }
    }
});
