const speed = document.querySelector("#speed");
const speedVal = document.querySelector("#speed-val");
const reverb = document.querySelector("#reverb");
const reverbVal = document.querySelector("#reverb-val");

chrome.storage.local.get(["speed", "reverb"], (data) => {
    if (data.speed) {
        speed.value = data.speed;
        speedVal.textContent = data.speed;
    }

    if (data.reverb) {
        reverb.value = data.reverb;
        reverbVal.textContent = data.reverb;
    }
})

function saveSetting() {
    chrome.storage.local.set({
        speed: speed.value,
        reverb: reverb.value
    })
}

speed.addEventListener("input", () => {
    speedVal.textContent = speed.value;
    saveSetting();

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

reverb.addEventListener("input", () => {
    reverbVal.textContent = reverb.value;
    saveSetting();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
            chrome.tabs.sendMessage(activeTab.id, {
                action: "reverb",
                reverb: parseFloat(reverb.value)
            });
        }
    });
})