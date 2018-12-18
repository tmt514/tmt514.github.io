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
    "url": "webpack-runtime-361e06c680ea1c50e71a.js"
  },
  {
    "url": "app-fd8ba73db0d0248dda43.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-7081173250db2433e8db.js"
  },
  {
    "url": "index.html",
    "revision": "e8498ef6e18a667e2aa01b7bbe1821f9"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "9a1a3e364bec7e7e26868e3ba294ced7"
  },
  {
    "url": "component---src-pages-index-js.150058c3187fdab12c42.css"
  },
  {
    "url": "0.353c0f6764dcfb2ac8a2.css"
  },
  {
    "url": "0-870c11bd56d61ec01632.js"
  },
  {
    "url": "1-89eb4ef7b76483327cdd.js"
  },
  {
    "url": "10-53a234005d3d40513754.js"
  },
  {
    "url": "component---src-pages-index-js-48d3d8408d938246f230.js"
  },
  {
    "url": "static/d/901/path---index-6a9-zzIVB0dpAHSGnf7wL1Vkg24k7g.json",
    "revision": "3896af304a8a62a7ad80a6260e50f71c"
  },
  {
    "url": "component---src-pages-404-js.150058c3187fdab12c42.css"
  },
  {
    "url": "component---src-pages-404-js-4d649ad593e5ad981919.js"
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