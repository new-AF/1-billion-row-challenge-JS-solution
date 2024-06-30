const Do_Log = false;
const Max_Lines_To_Print = Infinity;

const log = (...data) => {
    if (Do_Log === false) return;
    console.log(data);
};
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
    log("--", city, temperature);

    if (stations.has(city) === false)
        stations.set(
            city,
            new Map([
                ["name", city],
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
    ++count;
    log(count, line);
    processLine(line);

    if (count >= Max_Lines_To_Print) {
        stream.close();
        stream.removeAllListeners();
    }
};
const onClose = (event) => {
    // log(stations);
    log(`
// results //
`);

    stations.forEach((map, city) => {
        const average = (map.get("sum") / map.get("count")).toFixed(1);
        const min = map.get("min").toFixed(1);
        const max = map.get("max").toFixed(1);
        const count = map.get("count");
        // if (count === 1) return;
        console.log(`${city}:${min},${average},${max},${count}`);
    });
};
stream.on("line", onLine);
stream.on("close", onClose);
