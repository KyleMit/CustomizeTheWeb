// ==UserScript==
// @name         Exclusive Quick Filters
// @namespace    https://openuserjs.org/users/KyleMit
// @version      1.0
// @description  Deslect existing quick filters (unless holding shift or ctrl)
// @author       KyleMit
// @copyright    2018, KyleMit
// @license      MIT
// @match        https://ahs-jira-prod.ahs.state.vt.us/jira/*
// @grant        none
// @homepage     https://github.com/KyleMit/CustomizeTheWeb#readme
// @homepageURL  https://github.com/KyleMit/CustomizeTheWeb#readme
// @downloadURL  https://github.com/KyleMit/CustomizeTheWeb/Scripts/ExclusiveQuickFilter.js
// @updateURL    https://github.com/KyleMit/CustomizeTheWeb/Scripts/ExclusiveQuickFilter.js
// @supportURL   https://github.com/KyleMit/CustomizeTheWeb/issues
// ==/UserScript==

// ==OpenUserJS==
// @author       KyleMit
// ==/OpenUserJS==

// User Script Notes:
// assumes jQuery, but jira uses, so don't need @require https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js
// update match statementment to your hosted jira instance

/* global jQuery */

(function($) {
    'use strict';

    $("body").on("mousedown", ".js-quickfilter-button", function(e) {
        // if de-selecting, don't do anything
        if ($(this).is(".ghx-active")) return;

        // if holding down ctrl or shift, allow click
        if (e.ctrlKey || e.shiftKey) return;

        // otherwise, active click on any active elements to deselect them
        $(".js-quickfilter-button.ghx-active").click();
    });

})(jQuery);
