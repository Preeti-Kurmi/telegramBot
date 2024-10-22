const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const { startBot } = require('./services/telegramService');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Initialize the Telegram bot
startBot();

// Set up routes
app.use('/admin', adminRoutes);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
