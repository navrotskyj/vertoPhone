/**
 * Created by igor on 27.09.16.
 */

"use strict";

var ext = chrome.extension.getBackgroundPage().ext;
var input = document.getElementById('callInput');
var activeCallsDiv = document.getElementById('activeCalls');
var open = document.getElementById('open');
var c2c = document.getElementById('c2c');

setC2C(ext.c2cEnabled());

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

c2c.addEventListener('click', (e) => {
    ext.c2cToggle();
    window.close();
});

function setC2C(active) {
    if (active) {
        c2c.classList.add('active')
    } else {
        c2c.classList.remove('active')
    }
}