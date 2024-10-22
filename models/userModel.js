const fs=require('fs')
let blockedUsers = [];

const loadBlockedUsers = () => {
    if (fs.existsSync('blockedUsers.json')) {
        blockedUsers = JSON.parse(fs.readFileSync('blockedUsers.json'));
    }
};

const saveBlockedUsers = (users) => {
    fs.writeFileSync('blockedUsers.json', JSON.stringify(users));
};

loadBlockedUsers();

module.exports = {
    blockedUsers,
    saveBlockedUsers
};
