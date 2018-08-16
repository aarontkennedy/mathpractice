
function LocalProfileStorage(appNameAsStorageKey="mathingApp") {
    this.storageAvailable = (typeof (Storage) !== "undefined");
    this.storageKey = appNameAsStorageKey;
    if (!this.storageAvailable) {
        console.log("LocalStorage not available.");
    }
    else {
        console.log("LocalStorage available.");
    }
}

LocalProfileStorage.prototype.add = function (profile) {
    if (this.storageAvailable && profile) {
        localStorage.setItem(this.storageKey,
            JSON.stringify(profile));
    }
};

LocalProfileStorage.prototype.retrieve = function () {
    let result = null;
    if (this.storageAvailable) {
        result = JSON.parse(localStorage.getItem(this.storageKey));
    }
    return result;
};

LocalProfileStorage.prototype.remove = function () {
    if (this.storageAvailable) {
        localStorage.removeItem(this.storageKey);
    }
}

export default LocalProfileStorage;
