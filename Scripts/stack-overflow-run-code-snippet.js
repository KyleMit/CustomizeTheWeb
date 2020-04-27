// ==UserScript==
// @name         Run Code Snippet
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Refresh Code Snippet with Ctrl + Enter
// @author       KyleMit
// @match        https://stackoverflow.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // listen for key events - https://stackoverflow.com/a/16089470/1366033
    document.onkeypress = function(e) {
        e = e || window.event;
        if (e.keyCode === 10 && e.ctrlKey) {
            // invoke click - https://stackoverflow.com/a/25806894/1366033
            document.getElementById('snpte-button-run').click();
        }
    };
})();