const fs=require('fs')


let subscribers = [];

const loadSubscribers = () => {
    if (fs.existsSync('subscribers.json')) {
        subscribers = JSON.parse(fs.readFileSync('subscribers.json'));
    }
};

const saveSubscribers = (subscribersList) => {
    fs.writeFileSync('subscribers.json', JSON.stringify(subscribersList));
};

loadSubscribers();

module.exports = {
    subscribers,
    saveSubscribers
};
