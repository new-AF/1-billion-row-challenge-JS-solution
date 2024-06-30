# My JavaScript solution to the 1 billion row challenge (1brc)

Credit:

-   Link to original challenge: [https://github.com/gunnarmorling/1brc](https://github.com/gunnarmorling/1brc)
-   (modified) `CreateMeasurements.java` Licensed under the Apache License, Version 2.0 (the "License"); Copyright 2023 The original authors

# Usage

## (1/4) Clone this repo

`git clone https://github.com/new-AF/1-billion-row-challenge-JS-solution`

## (2/4) Download a small open-source utility to time programs

I use Windows so get `pbench.exe` from

-   [https://github.com/chemodax/pbench/releases](https://github.com/chemodax/pbench/releases)

## (3/4) Generate n-number-of-lines `measurements.txt`

-   You will a need JDK, to compile and run `./java-code/CreateMeasurements.java`
-   I use openJDK (.zip portable), so download latest version (current 22.0.1) from
    -   [https://openjdk.org/](https://openjdk.org/)
-   extract the base folder `jdk-22.0.1`
-   navigate into the `bin` folder
-   copy the full path of `javac.exe` and `java.exe`

Navigate back to your copy of this cloned repo:

-   navigate into your cloned `java-code` folder, compile and run the java program:
    -   `"C:/Users/Your-User-Name/Downloads/jdk-22.0.1/bin/javac.exe" CreateMeasurements.java`
    -   `"C:/Your-User-Name/Downloads/jdk-22.0.1/bin/java.exe" CreateMeasurements 1_000_000` (1_000_000_000 will be 12.8GB file)

## (4/4) `my solution.js`

Navigate back to your copy of this cloned repo:

-   `./pbench.exe node "my solution.js" "./java-code/measurements.txt"`

---

# Results

This is a straight-forward single-threaded solution which processed 1 billion rows in 22 minutes on my laptop.

```plaintext
== Performance of node "my solution.js" ./java-code/measurements.txt
   Real time: 1271.067 s
    CPU time: 1255.140 s
   User time: 1238.984 s
 Kernel time:   16.156 s
     Read IO:   210506 (13472149 KB)
    Write IO:        0 (       0 KB)
    Other IO:      187 (       1 KB)
Peak WS size:    63788 KB

  Total time: 1271.080 s
```
