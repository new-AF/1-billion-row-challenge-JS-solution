const log = console.log;
const fs = require("fs");
const readline = require("readline");

// log("hello");
const originalStream = fs.createReadStream("./weather_stations.csv", {
    encoding: "utf8",
});
const stream = readline.createInterface({
    input: originalStream,
    crlfDelay: Infinity,
});

const stations = new Map();
let count = 0;

const onLine = (chunk) => {
    log(chunk, count);
    ++count;
    if (count > 5) {
        stream.close();
        stream.removeAllListeners();
    }
};
stream.on("line", onLine);
// stream.on("close", onLine);
