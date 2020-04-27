// ==UserScript==
// @name         highlightjs style browser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Tab through highlightjs styles
// @author       KyleMit
// @match        https://highlightjs.org/static/demo/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll("#styles li, #categories li").forEach(function(el) {
        // make list items focusable - a11y version would be to make li > a
        el.tabIndex = 0
            // when we focus, pretend it's a click
        el.addEventListener('focus', function(e) { el.click(); });
        // now we can tab through options
    });
})();