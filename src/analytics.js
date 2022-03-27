/**
 * Global site tag (gtag.js) - Google Analytics
 *
 * https://developers.google.com/analytics/devguides/collection/gtagjs
 */

const script = document.createElement('script');
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`;
document.head.appendChild(script);

window[`ga-disable-${process.env.GOOGLE_ANALYTICS_ID}`] =
  process.env.NODE_ENV !== 'production';

window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', process.env.GOOGLE_ANALYTICS_ID);
