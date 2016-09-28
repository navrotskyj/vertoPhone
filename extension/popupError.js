/**
 * Created by igor on 27.09.16.
 */

"use strict";

var ext = chrome.extension.getBackgroundPage().ext;
var title = document.getElementById('title');
var msg = document.getElementById('msg');
var retry = document.getElementById('retry');
var installed = false;

if (!ext.checkInstall()) {
    title.textContent = ext.NOT_INSTALL_TITLE;
    msg.textContent = ext.NOT_INSTALL_MSG;
} else if (!ext.checkEnabled()) {
    title.textContent = ext.NOT_RUN_TITLE;
    msg.textContent = ext.NOT_RUN_MSG;
    retry.textContent = 'Enable application';
    installed = true;
} else {
    title.textContent = ext.NO_SETTINGS_TITLE;
    msg.textContent = ext.NO_SETTINGS_MSG;
    retry.textContent = 'Open';
    installed = true;
}

retry.addEventListener('click', (e) => {
    if (!installed) {
        ext.setConnectVerto();
    } else {
        ext.enableVerto();
    }

    window.close();
});