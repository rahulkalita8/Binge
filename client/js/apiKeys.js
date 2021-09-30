const getApiKeyFromStorage = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(LOCAL_STORAGE_API_KEY, (result) =>
            resolve(result ? result[LOCAL_STORAGE_API_KEY] : '84c24527')
        );
    });
};

const getImdbApiKeyFromStorage = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(LOCAL_STORAGE_IMDB_API_KEY, (result) =>
            resolve(result ? result[LOCAL_STORAGE_IMDB_API_KEY] : 'k_gea4slmo')
        );
    });
};
