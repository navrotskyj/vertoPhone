/**
 * Created by igor on 27.09.16.
 */

"use strict";

var ext = chrome.extension.getBackgroundPage().ext;
var input = document.getElementById('callInput');
var activeCallsDiv = document.getElementById('activeCalls');
var open = document.getElementById('open');

function createCall(id) {
    var ul = document.createElement('ul');
    ul.id = id;
    var li = document.createElement('li');
    li.textContent = id;
    ul.appendChild(li);
    activeCallsDiv.appendChild(ul);
}

document.getElementById('makeCall').addEventListener('submit', (e) => {
    if (input.value) {
        ext.makeCall(input.value);
        window.close();
    }
});

open.addEventListener('click', (e) => {
    ext.runVerto();
    window.close();
});
