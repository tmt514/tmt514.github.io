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
    "url": "webpack-runtime-12ef9b9a2309149dcf87.js"
  },
  {
    "url": "app-53b8942863a22ff7f567.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-137f8fa73391e9a41480.js"
  },
  {
    "url": "index.html",
    "revision": "c96886194250167b33eaeafe4604eb55"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "86152f1bdfa0043853f916f7293f38db"
  },
  {
    "url": "component---src-pages-index-js.214b22b0fb76655d6dd1.css"
  },
  {
    "url": "0.353c0f6764dcfb2ac8a2.css"
  },
  {
    "url": "component---src-pages-index-js-9e3d72397d7f50773c0e.js"
  },
  {
    "url": "11-96db26079c693603c54b.js"
  },
  {
    "url": "1-dfcd18074d304ec583e3.js"
  },
  {
    "url": "0-e1eec373b4e423240aa4.js"
  },
  {
    "url": "static/d/347/path---index-6a9-hvCEXYmV5n0uaCVCYMuTYg43gqI.json",
    "revision": "f8ea1e548b2b0331281057368c4d7612"
  },
  {
    "url": "component---src-pages-404-js.214b22b0fb76655d6dd1.css"
  },
  {
    "url": "component---src-pages-404-js-16a07f2e7a2824632f8e.js"
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