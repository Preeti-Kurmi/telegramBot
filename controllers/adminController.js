const passport = require('passport');
require('dotenv').config()
console.log(process.env.BOT_TOKEN)
exports.adminPanel = (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>Admin Panel</h1>
        <form method="POST" action="/admin/update-settings">
            <label>Bot Token: <input type="text" name="bot_token" value="${process.env.BOT_TOKEN}" /></label><br />
            <label>Weather API Key: <input type="text" name="weather_api_key" value="${process.env.WEATHER_API_KEY}" /></label><br />
            <button type="submit">Update</button>
        </form>
        <h2>Manage Users</h2>
        <form method="POST" action="/admin/block-user">
            <label>Block User (ID): <input type="text" name="user_id" /></label>
            <button type="submit">Block</button>
        </form>
        <form method="POST" action="/admin/unblock-user">
            <label>Unblock User (ID): <input type="text" name="user_id" /></label>
            <button type="submit">Unblock</button>
        </form>`);
    } else {
        res.redirect('/auth/google');
    }
};

exports.updateSettings = (req, res) => {
    process.env.BOT_TOKEN = req.body.bot_token;
    process.env.WEATHER_API_KEY = req.body.weather_api_key;
    res.redirect('/admin');
};

// Middleware to check if user is an admin
exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/google');
};

// Block a user
exports.blockUser = (req, res) => {
    const userId = parseInt(req.body.user_id);
    const blockedUsers = require('../models/userModel').blockedUsers;
    if (!blockedUsers.includes(userId)) {
        blockedUsers.push(userId);
        require('../utils/fileUtils').saveBlockedUsers(blockedUsers);
    }
    res.redirect('/admin');
};

// Unblock a user
exports.unblockUser = (req, res) => {
    const userId = parseInt(req.body.user_id);
    let blockedUsers = require('../models/userModel').blockedUsers;
    blockedUsers = blockedUsers.filter(id => id !== userId);
    require('../utils/fileUtils').saveBlockedUsers(blockedUsers);
    res.redirect('/admin');
};
