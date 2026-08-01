const speed = document.querySelector("#speed");
const speedVal = document.querySelector("#speed-val");
const reverb = document.querySelector("#reverb");
const reverbVal = document.querySelector("#reverb-val");

speed.addEventListener("input", () => {
    speedVal.textContent = speed.value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
            chrome.tabs.sendMessage(activeTab.id, {
                action: "play",
                speed: parseFloat(speed.value)
            });
        }
    });
});


