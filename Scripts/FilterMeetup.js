// ==UserScript==
// @name         Remove Suggested Meetups
// @namespace    https://github.com/KyleMit/CustomizeTheWeb
// @version      1.1
// @description  Say goodbye to annoying suggested meetup requests that you can't get rid of
// @author       KyleMit
// @license      MIT
// @icon         http://kylemitofsky.com/favicon.png
// @run-at       document-end
// @match        https://www.meetup.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js
// @grant        none
// @homepage    https://github.com/KyleMit/CustomizeTheWeb#readme
// @homepageURL https://github.com/KyleMit/CustomizeTheWeb#readme
// @downloadURL https://github.com/KyleMit/CustomizeTheWeb/Scripts/FilterMeetup.js
// @updateURL   https://github.com/KyleMit/CustomizeTheWeb/Scripts/FilterMeetup.js
// @supportURL  https://github.com/KyleMit/CustomizeTheWeb/issues
// ==/UserScript==

/* global $ */

'use strict';

(function() {
    'use strict';

    var blacklist = ["WuXingCMA","Expressive-Arts-Beginning-Anew-Finding-Forgiveness"];
    var blRegex = new RegExp(blacklist.join("|"));
    $("a").filter(function(i,el) { return (blRegex.test(el.href)); })
	      .closest("li.event-listing")
	      .remove();
})();
