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
    "url": "webpack-runtime-9e7d8c9a5004a96f1309.js"
  },
  {
    "url": "app-b2a3b64090d5acb7d513.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-137f8fa73391e9a41480.js"
  },
  {
    "url": "index.html",
    "revision": "9a74eea8ee48834499ff76185e2fecb6"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "13024bb5adbeeafe65f1e45e2bff4632"
  },
  {
    "url": "component---src-pages-index-js.150058c3187fdab12c42.css"
  },
  {
    "url": "0.353c0f6764dcfb2ac8a2.css"
  },
  {
    "url": "component---src-pages-index-js-9318ff326d06d5d3694b.js"
  },
  {
    "url": "10-10d293705c5418b9cb38.js"
  },
  {
    "url": "1-264ca2e4bdb6243e0254.js"
  },
  {
    "url": "0-3456fd3a0d16ff44fd4e.js"
  },
  {
    "url": "static/d/901/path---index-6a9-zzIVB0dpAHSGnf7wL1Vkg24k7g.json",
    "revision": "3896af304a8a62a7ad80a6260e50f71c"
  },
  {
    "url": "component---src-pages-404-js.150058c3187fdab12c42.css"
  },
  {
    "url": "component---src-pages-404-js-350e602d04bf00c4ad68.js"
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