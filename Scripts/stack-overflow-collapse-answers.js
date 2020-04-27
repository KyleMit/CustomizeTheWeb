// ==UserScript==
// @name         Expand / Collapse Answers
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Save space by toggling answers closed
// @author       KyleMit
// @match        https://stackoverflow.com/questions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll('.answer').forEach(el => {
        var btn = document.createElement('button')
        btn.innerText = "-"
        btn.classList.add('visibility-toggle')
        el.append(btn)
    })
    document.addEventListener('click', (e) => {
        let el = e.target
        if (el.classList.contains('visibility-toggle')) {
            var isClosed = el.classList.contains('collapse')
            el.innerText = isClosed ? "-" : "+"
            el.classList.toggle('collapse', !isClosed)
            el.parentElement.classList.toggle('collapse', !isClosed)
        }
    })

    var styles = `.answer {
    position:relative;
}
.answer .visibility-toggle {
    content: "-";
    position: absolute;
    color: black;
    background: transparent;
    border: none;
    box-shadow: none;
    font-size: 3em;
    top: -26px;
    left: -19px;
    padding: 5px 3px;
    padding-bottom: 7px;
    min-height: initial;
    line-height: 0.1;
    font-family: monospace;
    height: 29px;
    border-radius: 4px;
}

.answer .visibility-toggle:focus {
    color: black;
    background-color: transparent;
    border: none;
    box-shadow: none;
}

.answer ~ .answer .visibility-toggle {
    top: -16px;
}

.answer {
    transition: padding .5s ease;
}
.answer.collapse {
    padding: 10px;
}
.answer ~ .answer.collapse {
    padding: 15px;
}
.answer .post-layout {
    height: auto;
    transition: all .5s ease;
}
.answer.collapse .post-layout {
    height:0;
    overflow: hidden;
}
`

    var styleNode = document.createElement('style')
    styleNode.type = "text/css"
    styleNode.appendChild(document.createTextNode(styles))
    document.head.appendChild(styleNode)
})();