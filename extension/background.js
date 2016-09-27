/**
 * Created by igor on 27.09.16.
 */

"use strict";

const VERTO_APP_NAME = 'Verto SofthPhone',
    ERR_NOT_INSTALLED = new Error(`Not installed ${VERTO_APP_NAME}`),
    ERR_NOT_RUNING = new Error(`No running ${VERTO_APP_NAME}`),
    CONTEXT_MENU_ID = 'selectAndCallVerto'
    ;

class Extension {
    constructor () {
        this.port = null;
        this.vertoApplication = null;
        this.setConnectVerto();
        this.contextMenu = null;
        chrome.contextMenus.onClicked.addListener((info) => {
            if (info.menuItemId == CONTEXT_MENU_ID) {
                var number = info.selectionText;
                this.onClickCallMenu(number)
            }
        });


    }

    get NOT_INSTALL_TITLE () {
        return `No install '${VERTO_APP_NAME}'`;
    }

    get NOT_INSTALL_MSG () {
        return `Please install '${VERTO_APP_NAME}'`;
    }

    get NOT_RUN_TITLE() {
        return `Is not running ${VERTO_APP_NAME}`;
    }
    
    get NOT_RUN_MSG() {
        return `Please enable ${VERTO_APP_NAME}`;
    }

    createContextMenu () {
        this.contextMenu = chrome.contextMenus.create({
            id: CONTEXT_MENU_ID,
            type: 'normal',
            title: 'Call',
            contexts: ['selection']
        });
    }

    removeContextMenu () {
        if (this.contextMenu) {
            chrome.contextMenus.remove(CONTEXT_MENU_ID);
            this.contextMenu = null;
        }
    }

    setError (err) {
        console.error(err);
    }

    setVertoConnectError () {
        this.changeIcon('error64.png');
        this.connected = false;
        chrome.browserAction.setPopup({popup: `errorPopup.html`});
        this.removeContextMenu();
    }

    setVertoConnectOK () {
        this.changeIcon('call64.png');
        chrome.browserAction.setPopup({popup: `popup.html`});
        this.createContextMenu();
        this.connected = true;
    }

    enableVerto () {
        chrome.management.setEnabled(ext.vertoApplication.id, true, this.runVerto.bind(this));
    }

    runVerto () {
        chrome.management.launchApp(ext.vertoApplication.id);
    }

    checkInstall () {
        return !!this.vertoApplication;
    }

    checkEnabled () {
        return ext.vertoApplication && ext.vertoApplication.enabled;
    }

    setConnectVerto () {
        this.port = null;
        if (this.timerReconnect) {
            clearTimeout(this.timerReconnect);
        }
        chrome.management.getAll((apps) => {
            for (let app of apps) {
                if (app.name === VERTO_APP_NAME) {
                    this.vertoApplication = app;
                    this.port = chrome.runtime.connect(app.id, {name: "vertoExtension"});
                    this.port.onMessage.addListener(this.onMessageVerto.bind(this));
                    this.port.onDisconnect.addListener((e) => {
                        this.setVertoConnectError();
                        this.timerReconnect = setTimeout( ()=> {
                            this.setConnectVerto();
                        }, 5000);
                    });
                    return;
                }
            }
            this.vertoApplication = null;
            this.setVertoConnectError();
            this.setError(ERR_NOT_INSTALLED);
        });
    }

    onMessageVerto (data) {
        if (!data)
            return;

        switch (data.action) {
            case "login":
                this.setVertoConnectOK();
                break;

            case "logout":
                this.setVertoConnectError();
                break;

            case "noLiveConnect":
                this.setVertoConnectError();
                break;
        }
    }

    sendMethod (method, params) {
        if (!this.vertoApplication)
            return this.setError(ERR_NOT_INSTALLED);

        if (!this.checkEnabled())
            return this.setError(ERR_NOT_INSTALLED);


        console.debug(`try send ${method}`);
        this.port.postMessage({
            action: method,
            data: params
        });
    }

    onClickCallMenu (number) {
        console.log(number);
        this.makeCall(number);
    }

    onChangeActiveCalls (calls) {}

    changeIcon (iconName) {
        chrome.browserAction.setIcon({path: `images/${iconName}`});
    }

    makeCall (number) {
        this.sendMethod('makeCall', {
            number: number
        });
    }

    hangupCall () {

    }
}

var ext = new Extension();
