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

const processLine = (line) => {
    if (line.startsWith("#")) return;

    const [city, temperatureString] = line.split(";");
    const temperature = parseFloat(temperatureString);
    // log("--", city, temperature);
};

const onLine = (line) => {
    ++count;
    log(line, count);
    if (count >= 5) {
        stream.close();
        stream.removeAllListeners();
    }
    processLine(line);
};
stream.on("line", onLine);
// stream.on("close", onLine);
