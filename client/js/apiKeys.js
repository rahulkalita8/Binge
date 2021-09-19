const getApiKeyFromStorage = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(LOCAL_STORAGE_API_KEY, (result) =>
            resolve(result ? result[LOCAL_STORAGE_API_KEY] : '84c24527')
        );
    });
};
