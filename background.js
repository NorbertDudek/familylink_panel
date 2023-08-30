let currentTabId;
let familylinkTabId;
let previousTab;

function onError(e) {
    console.log("***Error: " + e);
};

function setButtonIcon(imageURL) {
    try {
        browser.browserAction.setIcon({ path: imageURL });
    } catch (e) {
        onError(e);
    }
};

function createTab() {
    browser.tabs.create(
        {
            url: "https://familylink.google.com",
            pinned: false,
            active: true
        }
    )
};

function handleSearch(familylinkTabs) {
    //console.log("currentTabId: " + currentTabId);
    if (familylinkTabs.length > 0) {
        //console.log("there is a familylinkTabs tab");
        familylinkTabId = familylinkTabs[0].id;
        if (familylinkTabId === currentTabId) {
            //console.log("I'm in the gmail tab");
            browser.tabs.update(previousTab, { active: true, });
        } else {
            //console.log("I'm NOT in the gmail tab");
            previousTab = currentTabId;
            browser.tabs.update(familylinkTabId, { active: true, });
        }
        setButtonIcon(familylinkTabs[0].favIconUrl);
    } else {
        //console.log("there is NO gmail tab");
        previousTab = currentTabId;
        createTab();
    }
};

function handleClick(tab) {
    //console.log("*********Button clicked*********");
    currentTabId = tab.id;
    var querying = browser.tabs.query({ url: "*://familylink.google.com/*" });
    querying.then(handleSearch, onError);
};

browser.browserAction.onClicked.addListener(handleClick);
