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
    var a = document.createElement('a');
    a.textContent = ext.NOT_INSTALL_MSG;
    a.target = '_blank';
    a.href = "https://chrome.google.com/webstore/detail/verto-phone/alielclaaklopeegndabapgabdkbdkkh?utm_source=chrome-ntp-icon";
    msg.appendChild(a);
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