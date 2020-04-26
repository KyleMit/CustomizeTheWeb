// ==UserScript==
// @name         Remove Another Neighbor Posts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove intro posts
// @author       KyleMit
// @match        https://frontporchforum.com/areas/*/posts*
// @grant        none
// ==/UserScript==
/* globals $ */

(function() {
    'use strict';

    $(".post h3:contains('Another Neighbor Joins Forum')").closest(".post").remove()

})();
