const timingMetrics = window.performance.getEntriesByType('navigation')[0];
const API_URL =
  document.currentScript.getAttribute('api-url') ||
  'https://localhost:5000/metrics';

const performanceMetrics = {
  metrics: {
    TTFB: 0,
    FCP: 0,
    DomLoad: 0,
    WindowLoad: 0,
    ResourcesLoad: [],
  },
};

const milSecToSec = (milSec) => {
  return milSec / 1000;
};

const measureTTFB = async () => {
  const TTFB = timingMetrics.responseStart - timingMetrics.requestStart;
  return milSecToSec(TTFB);
};

const measureFCP = async () => {
  if (window) {
    const fcp = window.performance
      .getEntriesByType('paint')
      .find((elem) => elem.name === 'first-contentful-paint');
    if (fcp.startTime) {
      return milSecToSec(fcp.startTime);
    }
  }
};

const measureDomLoaded = async () => {
  const domLoaded =
    timingMetrics.domContentLoadedEventEnd - timingMetrics.fetchStart;
  return milSecToSec(domLoaded);
};

const measureWindowLoaded = async () => {
  const windowLoaded =
    timingMetrics.loadEventStart - timingMetrics.loadEventEnd;
  return milSecToSec(windowLoaded);
};

const measureResourcesLoad = async () => {
  const resourcesMetrics = performance.getEntriesByType('resource');

  return resourcesMetrics.map((resource) => {
    return {
      id: '_' + Math.random().toString(36).substr(2, 9),
      name: resource.name,
      initiatorType: resource.initiatorType,
      loadTime: milSecToSec(resource.responseEnd - resource.requestStart),
    };
  });
};

const measurePerformanceMetrics = async () => {
  performanceMetrics.metrics.TTFB = await measureTTFB();
  performanceMetrics.metrics.FCP = await measureFCP();
  performanceMetrics.metrics.DomLoad = await measureDomLoaded();
  performanceMetrics.metrics.WindowLoad = await measureWindowLoaded();
  performanceMetrics.metrics.ResourcesLoad = await measureResourcesLoad();
  return performanceMetrics;
};

const sendMetrics = (metricsData) => {
  const url = API_URL;
  const data = JSON.stringify(metricsData);
  const options = {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options);
};

(async function init() {
  window.addEventListener('load', async () => {
    const metrics = await measurePerformanceMetrics();
    sendMetrics(metrics);
  });
})();
