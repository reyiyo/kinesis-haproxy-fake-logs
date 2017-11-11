const AWS = require('aws-sdk');
const generateHaproxyLog = require('haproxy-log-generator');

const streamName = process.env.STREAM_NAME || 'LoadBalancerLogs';
const partitionKey = process.env.PARTITION_KEY || Date.now().toString();

const kinesis = new AWS.Kinesis({ region: process.env.REGION || 'us-west-2' });

const generateEntries = entriesCount => {
    const maxEntries = entriesCount || 500;
    let i = maxEntries;
    const entries = [];

    while (i > 0) {
        entries.push(generateHaproxyLog());
        i--;
    }

    return entries;
};

setInterval(() => {
    const entries = generateEntries();
    const req = kinesis.putRecords(
        {
            StreamName: streamName,
            Records: entries.map(entry => {
                return { Data: entry, PartitionKey: partitionKey };
            })
        },
        (err, data) => {
            if (err) {
                return console.log(err);
            }
        }
    );
    req.on('complete', function() {
        req.removeAllListeners();
        req.response.httpResponse.stream && req.response.httpResponse.stream.removeAllListeners();
        req.httpRequest.stream && req.httpRequest.stream.removeAllListeners();
    });
}, 1000);
