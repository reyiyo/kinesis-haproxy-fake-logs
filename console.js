const generateHaproxyLog = require('haproxy-log-generator');

const printEntries = entriesCount => {
    const maxEntries = entriesCount;
    let i = maxEntries;

    while (i > 0) {
        console.log(generateHaproxyLog());
        i--;
    }
};

setInterval(() => {
    printEntries(process.env.ENTRIES_COUNT || 500);
}, 1000);
