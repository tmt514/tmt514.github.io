/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.5.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.5.0"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-974f0b13d8c8916949ce.js"
  },
  {
    "url": "app-45f9ca3f61d09d57cfe3.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-ef5f94b551fcdf8b031c.js"
  },
  {
    "url": "index.html",
    "revision": "c995cf8760ea726ff356d4cbd7a85563"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "eeea8b86391b6d79cd4bd2e77c167296"
  },
  {
    "url": "1.353c0f6764dcfb2ac8a2.css"
  },
  {
    "url": "component---src-pages-index-js.a82bc48cfa31deea5b5f.css"
  },
  {
    "url": "component---src-pages-index-js-c3fb43ec42d207564539.js"
  },
  {
    "url": "0-236ec731d3701658116b.js"
  },
  {
    "url": "10-f16a47582532f2fc68c9.js"
  },
  {
    "url": "1-e0182f2b2f92d001b0af.js"
  },
  {
    "url": "static/d/186/path---index-6a9-y7w0cKSxcRTC23IO3OTWSCW2Oc.json",
    "revision": "6d5f0d38b059f03a5212d76af895b240"
  },
  {
    "url": "component---src-pages-404-js.a82bc48cfa31deea5b5f.css"
  },
  {
    "url": "component---src-pages-404-js-b2140bd66ef6774dca02.js"
  },
  {
    "url": "static/d/164/path---404-html-516-62a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "55a9292126f8836e91e5d40b0a8cb54f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});