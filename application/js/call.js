/**
 * Created by igor on 30.09.16.
 */

"use strict";
    
class Call {
    /*
        dialog
     */
    constructor (d) {
        this.id = d.callID;
        this.direction = d.direction;
        this.cause = d.cause;
        this.answered = d.answered;
        this.attach = d.attach;
        this.calleeIdName = d.params.remote_caller_id_name;
        this.calleeIdNumber = Helper.deleteDomain(d.params.remote_caller_id_number);
        this.callerIdName = d.params.caller_id_name;
        this.callerIdNumber = Helper.deleteDomain(d.params.caller_id_number);
        this.useVideo = d.params.useVideo;
        this.state = 'newCall';
        this.onActiveTime = null;
        this.menuName = '';
        this.mute = false;
        this.initRemoteStream = false;
        this.screenShareCall = null;
        this.screenShareCallStreem = null;
        this.dtmf = [];

        this.contact = null;
        var scope = this;
        modelVerto.list('contacts', {limit: 1, sort: 'next', index: "_numbers", search: {text: this.calleeIdNumber}}, function (data) {
            if (data && data.length > 0) {
                scope.contact = data[0];
                Helper.sendSession('changeCall', session.activeCalls);
            }
        });

        if (this.direction == $.verto.enum.direction.inbound) {
            this.showNewCall();
        }
    }

    removeScreenShareCall () {
        this.screenShareCall = null;
        this.screenShareCallStreem = null;
        var w = Helper.getWindowById(this.id);
        if (w) {
            w.contentWindow.document.getElementById('remoteVideoRight').src = '';
            w.contentWindow.document.getElementsByClassName('right')[0].style.display = 'none'
        }
    }

    setMute (mute) {
        this.mute = mute;
    }

    setState (state) {
        this.state = state;
        if (!this.onActiveTime && state == 'active') {
            this.onActiveTime = Date.now();
            this._clearNotification()
        }
    }

    openMenu (name) {
        this.menuName = name;
    }

    _clearNotification () {
        if (this.notificationId)
            Helper.clearNotificationId(this.notificationId);
    }

    destroy (userDropCall) {
        this._clearNotification();
        // TODO add direction;
        if (!userDropCall && !this.onActiveTime && this.direction === $.verto.enum.direction.inbound)
            this.showMissed();

        if (this.screenShareCall) {
            try {
                this.hangupScreen();
            } catch (e) {
                console.error(e)
            }
        }

        var videoWindow = Helper.getWindowById(this.id);
        if (videoWindow)
            videoWindow.close();
    }

    setScreenShareCall (d) {
        this.screenShareCall = d.callID;
        var screenShareCallStreamSrc = this.screenShareCallStreem = URL.createObjectURL(d.rtc.remoteStream || d.rtc.localStream);

        var w = Helper.getWindowById(this.id);
        if (w) {
            var videoRight = w.contentWindow.document.getElementById('remoteVideoRight');
            videoRight.volume = 0;
            videoRight.src = screenShareCallStreamSrc;
            videoRight.play();
            w.contentWindow.document.getElementsByClassName('right')[0].style.display = 'flex'
        } else if (Helper.session) {
            Helper.session.openVideo(this.id);
        }
    }

    hangupScreen () {
        if (this.screenShareCall && Helper.session.verto.dialogs[this.screenShareCall])
            return Helper.session.verto.dialogs[this.screenShareCall].hangup();
    }

    showNewCall () {
        const session = Helper.session;
        if  (session && session.notificationNewCall) {
            Helper.createNotification({
                type: 'basic',
                iconUrl: 'images/call64.png',
                title: "New call",
                message: this.calleeIdNumber,
                contextMessage: this.calleeIdName,
                requireInteraction: true,
                buttons: [
                    {
                        title: "Answer",
                        iconUrl: "images/call64.png"
                    },
                    {
                        title: "Hangup",
                        iconUrl: "images/error64.png"
                    }
                ]
            }, (id) => {
                console.log(id);
                this.notificationId = id;
            });
        } else {
            if (!Helper.getWindowById('vertoPhone'))
                Helper.createVertoWindow();
        }
    }

    showMissed () {
        if  (Helper.session && Helper.session.notificationMissed) {
            const number = this.calleeIdNumber;
            Helper.createNotification({
                type: 'basic',
                iconUrl: 'images/exclamation64.png',
                title: "Missed call!",
                message: number,
                contextMessage: this.calleeIdName + '(' + new Date().toLocaleString() + ')',
                requireInteraction: true,
                buttons: [
                    {
                        title: "Reply",
                        iconUrl: "images/call64.png"
                    },
                    {
                        title: "OK",
                        iconUrl: "images/success64.png"
                    }
                ]
            }, (id) => {
                console.log(id);
                Helper.missedNotifications[id] = {
                    number: number
                }
            });
        }
    }
}