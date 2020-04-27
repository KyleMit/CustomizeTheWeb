// ==UserScript==
// @name         Yards Per Min
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically convert min/m to yards/min and display both
// @author       KyleMit
// @license      MIT
// @run-at       document-end
// @match        https://connect.garmin.com/modern/activity/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js
// @grant        none
// @homepage    https://github.com/KyleMit/CustomizeTheWeb#readme
// @homepageURL https://github.com/KyleMit/CustomizeTheWeb#readme
// @downloadURL https://github.com/KyleMit/CustomizeTheWeb/Scripts/YardsPerMin.js
// @updateURL   https://github.com/KyleMit/CustomizeTheWeb/Scripts/YardsPerMin.js
// @supportURL  https://github.com/KyleMit/CustomizeTheWeb/issues
// ==/UserScript==

/* jshint -W097 */
/* global $ */

'use strict';

// windows loads and then data elements are pulled - instead just wait 10 seconds
setTimeout(function() {
    // locate element
    var $dataBlock = $("#timingStatsPlaceholder .stat-block .data-block.small .data-label:contains(Avg Pace)").parent();
    var dataBit = $dataBlock.find(".data-bit").html();

    // parse data
    var time = dataBit.split(' ')[0];
    var min = parseInt(time.split(':')[0]);
    var sec = parseInt(time.split(':')[1]);
    var meter = parseInt(dataBit.split('/')[1]);

    // calculate
    var mins = min + (sec / 60);
    var yards = meter * 1.09361;
    var yardsPerMin = Math.round(yards / min);

    // create new
    var $newDataBlock = $dataBlock.clone();
    $newDataBlock.find(".data-bit").html(yardsPerMin);
    $newDataBlock.find(".data-label").html("Yards Per Min");

    // insert new
    $dataBlock.after($newDataBlock);

}, 10 * 1000);