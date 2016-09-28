/**
 * Created by igor on 28.09.16.
 */

"use strict";

var r_types = ["tel","dial","callto","ucdial","sip"];
var replaceList;
initialise();

function initialise() {
    document.getElementById("saveBtn").addEventListener("click", saveOptions);
    document.getElementById("eraseBtn").addEventListener("click", eraseOptions);

    document.getElementById("r_enable").addEventListener("click", protocolSelected);

    loadOptions();
}

function loadOptions() {

    chrome.storage.sync.get("minTelVal", function (obj) {
        document.getElementById("minTel").value = (obj.minTelVal != undefined) ? obj.minTelVal : 8;
    });

    chrome.storage.sync.get("maxTelVal", function (obj) {
        document.getElementById("maxTel").value = (obj.maxTelVal != undefined) ? obj.maxTelVal : 20;
    });

    chrome.storage.sync.get("replaceList", function (obj) {
        replaceList = (obj.replaceList != undefined) ? JSON.parse(obj.replaceList) : {};
        document.getElementById("r_enable").checked = replaceList["enable"];

        r_types.forEach(function(type) {
            document.getElementById("r_" + type).checked = replaceList[type];
        });

    });
}

function saveOptions() {

    chrome.storage.sync.get("replaceList", function (obj) {
        replaceList = (obj.replaceList != undefined) ? JSON.parse(obj.replaceList) : {};
        replaceList["enable"] = document.getElementById("r_enable").checked;

        r_types.forEach(function(type) {
            replaceList[type] = document.getElementById("r_" + type).checked;
        });

        chrome.storage.sync.set({'replaceList': JSON.stringify(replaceList)});
    });

    var minTelVal = document.getElementById("minTel").value;
    var maxTelVal = document.getElementById("maxTel").value;

    if ((minTelVal.replace(/\d/g,'').length == 0) && (maxTelVal.replace(/\d/g,'').length == 0)) {
        if (!isNaN(minTelVal) && !isNaN(maxTelVal)) {
            if(parseInt(minTelVal) <= parseInt(maxTelVal)) {
                chrome.storage.sync.set({'minTelVal': minTelVal});
                chrome.storage.sync.set({'maxTelVal': maxTelVal});
                location.reload();
            } else {
                document.getElementById("errorStr").textContent = "Error: 'Max' value must be equal or greater than 'Min' value.";
            }
        } else {
            document.getElementById("errorStr").textContent = "Error: Invalid value.";
        }
    } else {
        document.getElementById("errorStr").textContent = "Error: Invalid value.";
    }
}

function eraseOptions() {
    chrome.storage.sync.clear();
    location.reload();
}

function protocolSelected() {
    protReplaceSetter(document.getElementById("r_enable").checked)
}

function protReplaceSetter(isEnabled) {
    r_types.forEach(function(type) {
        document.getElementById("r_" + type).disabled = !isEnabled;
    });
}