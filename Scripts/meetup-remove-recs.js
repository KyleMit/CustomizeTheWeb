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

	var denylist = ["greater-burlington-bible-study"];
	var denyTest = new RegExp(denylist.join("|"));
	[...document.querySelectorAll("a")]
	    .filter(el => denyTest.test(el.href))
	    .map(el => el.closest("[data-testid='your-events-card']"))
	    .forEach(el => el.remove())

})();
