# PerfAnalytics - Client

This JavaScript file is the collector and the sender app of the PerfAnalytics App. It collect performance metrics and measures them and send them to the server via PerfAnalytics API.

Live CDN link can be seen here -> https://celebikerem.github.io/perf-analytics-client/analyzer.js

> Raw script size = **2.3 kB**

> Script size with Gzip = ~**1.3 kB**

## How it works

Measures performance data using [PerformanceNavigationTiming API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) that provided by the browser.
It collects and measures FCP, TTFB, Window Load, Dom Load and Resources Load metrics via using this API.

After processing the data it send the measured data to the server using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

The file itself is the IIFE function which means it runs on load by itself. It don't need to be call from somewhere, just importing the file is enough for the measuring data and send them.

## How to Install

It can be downloaded from this repo and it can be manually imported into the desired project.

But it's recommended to use this JS file via CDN. It can be found on https://celebikerem.github.io/perf-analytics-client/analyzer.js

To import file to the project add this line to the bottom of the head tag:

    <script  src="https://celebikerem.github.io/perf-analytics-client/analyzer.js"></script>

By default, the collected data is sent to https://localhost:5000/metrics. But this URL can be changed if desired.
To change the URL just simply add the `api-url` tag to the script.

    <script src="https://celebikerem.github.io/perf-analytics-client/analyzer.js" api-url="https://perf-analyzer-api.herokuapp.com/metrics"></script>
