const fs = require("fs");
const readline = require("readline");

const constants = {
    log: false,
    "max-lines-to-print": Infinity,
};

const log = (...data) => {
    if (Do_Log === false) return;
    console.log(...data);
};

const filePath = process.argv[2];

const originalStream = fs.createReadStream(filePath, {
    encoding: "utf8",
});
const stream = readline.createInterface({
    input: originalStream,
    crlfDelay: Infinity,
});

const stationsMap = new Map();

const processLine = (line, stations = stationsMap) => {
    if (line.startsWith("#")) return;

    const [city, temperatureString] = line.split(";");
    const temperature = parseFloat(temperatureString);

    if (stations.has(city) === false)
        stations.set(
            city,
            new Map([
                ["min", Infinity],
                ["max", -Infinity],
                ["sum", 0],
                ["count", 0],
                ["average", undefined],
            ])
        );

    const map = stations.get(city);
    const min = map.get("min");
    const max = map.get("max");
    const sum = map.get("sum");
    const count = map.get("count");

    map.set("min", temperature < min ? temperature : min);
    map.set("max", temperature > max ? temperature : max);
    map.set("sum", sum + temperature);
    map.set("count", count + 1);
};

const onLine = (line) => {
    processLine(line);
};
const onClose = (event) => {
    const stations = stationsMap;
    log(`
// results //
`);

    const keys = Array.from(stations.keys());

    const array = Array.from(keys, (city) => {
        const map = stations.get(city);

        const average = (map.get("sum") / map.get("count")).toFixed(1);
        const min = map.get("min").toFixed(1);
        const max = map.get("max").toFixed(1);
        const count = map.get("count");
        return `${city}=${min}/${average}/${max}`;
    });

    const originalOutput = array.join(", ");
    const output = `{${originalOutput}}`;

    log(output);
};

stream.on("line", onLine);
stream.on("close", onClose);
