const fs = require('fs');

const saveSubscribers = (subscribers) => {
    fs.writeFileSync('subscribers.json', JSON.stringify(subscribers));
};

const saveBlockedUsers = (blockedUsers) => {
    fs.writeFileSync('blockedUsers.json', JSON.stringify(blockedUsers));
};

module.exports = {
    saveSubscribers,
    saveBlockedUsers
};
