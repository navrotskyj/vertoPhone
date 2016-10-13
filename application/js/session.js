/**
 * Created by igor on 29.09.16.
 */

const MAX_CALL_COUNT = 5;

class Session {
	constructor (options = {}) {

        this.lastCallNumber = null;
        this.activeCalls = {};
        this.conference = {};
        this.videoParams = {};

        this.vertoLogin = options.login;
        this.cidName = options.cidName || this.vertoLogin;
        this.cidNumber = options.cidNumber || this.vertoLogin;

        this.notificationMissed = options.notificationMissed;
        this.notificationNewCall = options.notificationNewCall;

        if (options.ring) {
            this.ring = 'sound/iphone.mp3';
        }

        this.selectedVideo = options.selectedVideo;
        this.selectedSpeaker = options.selectedSpeaker;
        this.selectedAudio = options.selectedAudio;

        this.useVideo = options.useVideo;

        this.alwaysOnTop = options.alwaysOnTop || false;


        if (Helper.videoParamsBest[this.selectedVideo]) {
            this.videoParams = {
                minWidth: Helper.videoParamsBest[this.selectedVideo].w,
                minHeight: Helper.videoParamsBest[this.selectedVideo].h,
                maxWidth: Helper.videoParamsBest[this.selectedVideo].w,
                maxHeight: Helper.videoParamsBest[this.selectedVideo].h,
                // TODO move conf
                minFrameRate: 15
            }
        } else if (Object.keys(Helper.videoParamsBest).length == 1) {
            let bp = Helper.videoParamsBest[Object.keys(Helper.videoParamsBest)[0]];
            this.videoParams = {
                minWidth: bp.w,
                minHeight: bp.h,
                maxWidth: bp.w,
                maxHeight: bp.h,
                // TODO move conf
                minFrameRate: 15
            }
        }

        this.isLogin = false;

        // TODO
        this._settings = options;
        this.initLastCallNumber();

        this.verto = new $.verto({
            login: options.login,
            passwd: options.password,
            socketUrl: options.server,
            ringFile: this.ring,
            useCamera: this.selectedVideo,
            useSpeak: this.selectedSpeaker,
            useMic: this.selectedAudio,
            videoParams: this.videoParams,
            sessid: options.sessid,
            iceServers: options.iceServers
        }, this.vetoCallbacks);
        this.verto.login();

        if (Helper.phoneWindow) {
            Helper.phoneWindow.setAlwaysOnTop(this.alwaysOnTop);
        }
    }

    startConference (v, dialog, pvtData) {
        this.conference[pvtData.conferenceMemberID] = new Conference(
            v, dialog, pvtData, this.useVideo
        )

    }

    stopConference (id) {
        if (this.conference.hasOwnProperty(id)) {
            const call = this.activeCalls[this.conference[id].callId];
            this.conference[id].destroy();
            delete this.conference[id];

            if (call) {
                call.conferenceId = null;
                if (call.videoWindow) {
                    const w = chrome.app.window.get(call.id);
                    // TODO
                    if (w && w.contentWindow.init) {
                        w.contentWindow.init(this, call);
                    }
                }
            }
        }
    }

    get vetoCallbacks () {
        // TODO move helper ?
        function addVideo(id) {
            var video = document.createElement('video');
            video.id = id;
            video.volume = 1;
            video.style.display = 'none';
            document.body.appendChild(video);
            return video
        }

        function removeVideo(id) {
            const videoTag = document.getElementById(id);
            if (videoTag) {
                try {
                    videoTag.pause();
                    videoTag.src = "";
                    videoTag.remove();
                } catch (e) {
                    console.error(e)
                }
            }
        }

        return {
            onRemoteStream: (d) => {
                const call = this.activeCalls[d.callID];
                if (call) {
                    call.initRemoteStream = true;
                    Helper.sendSession('changeCall', this.activeCalls);
                }
            },

            onGetVideoContainer: (d) => {
                const video = addVideo(d.callID);
                d.params.tag = video.id;
            },

            onMessage: (v, dialog, msg, params) => {
                console.debug('onMessage:', v, dialog, msg, params);

                switch (msg) {
                    case $.verto.enum.message.pvtEvent:
                        if (params.pvtData) {
                            switch (params.pvtData.action) {
                                case "conference-liveArray-join":
                                    if (!params.pvtData.screenShare && !params.pvtData.videoOnly) {
                                        console.log("conference-liveArray-join");
                                        this.startConference(v, dialog, params.pvtData);
                                    }
                                break;

                                case "conference-liveArray-part":
                                    if (!params.pvtData.screenShare && !params.pvtData.videoOnly) {
                                        console.log("conference-liveArray-part");
                                        this.stopConference(params.pvtData.conferenceMemberID);
                                    }
                                break;
                            }
                        }
                        break;
                    case $.verto.enum.message.info:
                        const body = params.body,
                            from = params.from_msg_name || params.from
                            ;
                
                        break;
                    case $.verto.enum.message.display:
                        break;
                    default:
                        console.warn('Got a not implemented message:', msg, dialog, params);
                    break;
                }
            },

            onWSLogin: (e, success) => {
                console.info('onWSLogin', e, success);
                this.isLogin = success;
                if (success) {
                    Helper.createNotificationMsg(
                        'Login', 
                        'Success', 
                        'login ' + this.vertoLogin, 
                        'images/bell64.png', 
                        2000
                    );
                    this.sendLoginToExtension();
                } else {
                    Helper.createNotificationMsg(
                        'Login', 
                        'Error', 
                        'bad credentials ' + this.vertoLogin, 
                        'images/error64.png', 
                        10000
                    )
                }

                Helper.sendSession('onWSLogin', {
                    login: this.vertoLogin,
                    success: success,
                    settings: this._settings
                });                
            },

            onWSClose: (e) => {
                console.info('onWSClose');
                console.info(e);
                this.isLogin = false;
                this.sendLogoutToExtension();                
            },

            onError: (e) => {
                console.error(e);
            },

            // TODO;
            onDialogState: (d) => {
                const screenShare = /^(\d+).*-screen$/.exec(d.params.destination_number || d.params.remote_caller_id_number);

                if (screenShare) {
                    const number = screenShare[1];
                    for (let key in this.activeCalls) {
                        if (this.activeCalls[key].calleeIdNumber === number || this.activeCalls[key].screenShareCall == d.callID) {
                            d.screenShare = true;
                            if (d.state == $.verto.enum.state.ringing) {
                                d.answer({useVideo: true});
                            } else if (d.state == $.verto.enum.state.answering) {
                                this.activeCalls[key].setScreenShareCall(d);
                                return Helper.sendSession('changeCall', this.activeCalls);
                            } else if (d.state == $.verto.enum.state.requesting) {
                                this.activeCalls[key].setScreenShareCall(d);
                                return Helper.sendSession('changeCall', this.activeCalls);
                            } else if (d.state == $.verto.enum.state.destroy) {
                                this.activeCalls[key].removeScreenShareCall(d);
                                Helper.sendSession('changeCall', this.activeCalls);
                                d.rtc.stop();
                                removeVideo(d.callID);
                            }
                            return;
                        }
                    }
                    console.error('WTF screen');
                } else {
                    switch (d.state) {
                        case $.verto.enum.state.recovering:
                        case $.verto.enum.state.ringing:
                        case $.verto.enum.state.requesting:
                            if (Object.keys(this.activeCalls).length >= MAX_CALL_COUNT) {
                                d.hangup();
                                return;
                            }
                            d.createdOn = Date.now();
                            this.activeCalls[d.callID] = new Call(d);
                            break;
                        case $.verto.enum.state.active:
                            const dialogs = this.verto.dialogs;
                            for (let key in dialogs) {
                                if (key != d.callID
                                    && dialogs.hasOwnProperty(key)
                                    && dialogs[key].state == $.verto.enum.state.active
                                    && !dialogs[key].screenShare
                                ) {
                                    dialogs[key].hold();
                                }
                            }
                        case $.verto.enum.state.trying:
                        case $.verto.enum.state.held:
                            if (this.activeCalls.hasOwnProperty(d.callID)) {
                                this.activeCalls[d.callID].setState(d.state.name)
                            }
                            break;
                        case $.verto.enum.state.hangup:
                        case $.verto.enum.state.destroy:
                            if (this.activeCalls[d.callID]) {
                                modelVerto.add('history', {
                                    createdOn: d.createdOn,
                                    answeredOn: this.activeCalls[d.callID].onActiveTime,
                                    hangupOn: Date.now(),
                                    endCause: d.cause,
                                    number: d.params.remote_caller_id_number,
                                    name: this.activeCalls[d.callID].contact && this.activeCalls[d.callID].contact.name,
                                    direction: d.direction.name
                                }, (err) => {
                                    if (err)
                                        console.error(err);
                                });
                                this.activeCalls[d.callID].destroy(d.userDropCall, d);
                                delete this.activeCalls[d.callID];
                            }
                            removeVideo(d.callID);
                            break;
                        default:
                            console.warn('No handle: ', d.state);
                            this.activeCalls[d.callID].setState(d.state.name);

                    }

                    console.log(this.activeCalls);
                    Helper.sendSession('changeCall', this.activeCalls);
                }
            }

        }
    }

    initLastCallNumber () {
        this.listCollection('history', {limit: 1, index: "createdOn", sort: 'prev'}, (data) => {
            if (data && data.length > 0) {
                this.lastCallNumber = data[0].number;
            }
        });
    }

    logout () {
        try {
            this.verto.logout();
        } catch (e) {
            console.log(e);
        }
        return true;
    }

    getLastCallNumber () {
        return this.lastCallNumber || "";
    }

    sendLoginToExtension () {
        if (Helper.extensionPort && this.isLogin) {
            Helper.extensionPort.postMessage({
                action: "login",
                data: {}
            });
        }
    }

    sendLogoutToExtension() {
        if (Helper.extensionPort && this.isLogin) {
            Helper.extensionPort.postMessage({
                action: "logout",
                data: {}
            });
        }
    }

    refreshDevicesList () {
        $.verto.init({skipPermCheck: true}, ()=> {});
    }

    getDevicesList () {
        return {
            audioInDevices: $.verto.audioInDevices,
            audioOutDevices: $.verto.audioOutDevices,
            videoDevices: $.verto.videoDevices
        }
    }

    openMenu (id, name) {
        const call = this.activeCalls[id];
        if (call) {
            call.openMenu(name);
            Helper.sendSession('changeCall', this.activeCalls);
        }
    }

    openVideo (id) {
        const call = this.activeCalls[id];
        let scope = this;
        if (call && call.initRemoteStream) {
            console.warn('open window');
            const title = ' ' + call.calleeIdNumber + ' (' + call.calleeIdName + ')';
            var screenShareCallStreamSrc = call.screenShareCallStreem;
            chrome.app.window.create('app/view/videoCall2.html',
                {
                    id: id,
                    // alwaysOnTop: true,
                    innerBounds: {
                        width: 800,
                        height: 480
                    }
                },
                (window) => {
                    window.contentWindow.onload = function (e) {
                        call.videoWindow = true;
                        this.init(Helper.session, call);
                        this.document.title += title;
                        var videoLeft = e.target.getElementById('remoteVideoLeft');
                        var videoL = e.target.getElementById('localVideo');
                        var stream = scope.getCallStream(id);
                        if (stream) {
                            videoLeft.srcObject = stream.remoteStream;
                            videoLeft.volume = 0;
                            videoLeft.play();
                            // videoL.srcObject = stream.localStream;
                            // videoL.volume = 0;
                            // videoL.play();
                            if (screenShareCallStreamSrc) {
                                var videoRight = e.target.getElementById('remoteVideoRight');
                                videoRight.volume = 0;
                                videoRight.src = screenShareCallStreamSrc;
                                videoRight.play();
                            }

                        }
                    };
                    window.onClosed.addListener(() => {
                        if (call) {
                            call.videoWindow = false;
                        }
                    });
                }
            );
        }
    }

    // region call controll

    makeCall (number, option = {}) {
        this.lastCallNumber = number;
        this.verto.newCall({
            destination_number: number,
            caller_id_name: this.cidName,
            caller_id_number: this.cidNumber,

            useVideo: this.useVideo && option.useVideo,

            useCamera: this.selectedVideo,
            useSpeak: this.selectedSpeaker,
            useMic: this.selectedAudio

            // TODO Move settings
            // useStereo: false,
            // dedEnc: false,
            // mirrorInput: false,
            // userVariables: {
            //  avatar: '',
            //  email: '@',
            // }

        });
    }

    screenShare (parentCallId) {
        const call = this.activeCalls[parentCallId];
        if (!call) {
            return;
        }

        if (call.screenShareCall) {
            this.verto.dialogs[call.screenShareCall].hangup();
            return
        }

        this.verto.newCall({
            destination_number: call.calleeIdNumber + '-screen',
            caller_id_name: `${this.cidName}  (Screen)`,
            caller_id_number: `${this.cidNumber}  (Screen)`,
            useAudio: false,
            useStereo: false,
            useVideo: true,
            screenShare: true
        });
    }

    getCallStream (id) {
        const call = this.verto.dialogs[id];
        if (call) {
            return {
                localStream: call.rtc.localStream,
                remoteStream: call.rtc.remoteStream
            }
        }
    }

    setAudioPlaybackDevice (id, speakerId, cb) {
        const call = this.verto.dialogs[id];
        if (call) {
            call.setAudioPlaybackDevice(speakerId, cb)
        }
    }

    dropCall (id) {
        const call = this.verto.dialogs[id];
        if (call) {
            call.userDropCall = true;
            call.hangup();
        }
    }

    answerCall (id, params) {
        const d = this.verto.dialogs[id];
        const call = this.activeCalls[id];
        if (d && call && !call.onActiveTime) {
            call.useVideo = params && params.useVideo;
            d.answer({
                useVideo: call.useVideo,
                callee_id_name: this.cidName,
                callee_id_number: this.cidNumber
                //  TODO move to conf		
                // useStereo: false	
            });
        }
    }

    holdCall (id) {
        const call = this.verto.dialogs[id];
        if (call) {
            call.hold();
        }        
    }

    unholdCall (id) {
        const call = this.verto.dialogs[id];
        if (call) {
            call.unhold();
        }        
    }

    toggleHold (id) {
        const call = this.verto.dialogs[id];
        if (call) {
            call.toggleHold();
        }        
    }

    dtmf (id, digit) {
        const call = this.activeCalls[id],
            dialog = this.verto.dialogs[id]
            ;
        if (call) {
            call.dtmf(digit);
        }    

        if (dialog) {
            dialog.dtmf(digit);
        }        

        Helper.sendSession('changeCall', this.activeCalls);    
    }

    transfer (id, dest, params = {}) {
        const dialog = this.verto.dialogs[id];
        if (dialog)
            dialog.transfer(dest, params);        
    }

    toggleMute (id) {
        const call = this.activeCalls[id],
            dialog = this.verto.dialogs[id]
            ;

        if (call && dialog) {
            call.setMute(dialog.setMute('toggle'));
            Helper.sendSession('changeCall', this.activeCalls);
        }        
    }

    toggleMuteVideo (id) {
        const call = this.activeCalls[id],
            dialog = this.verto.dialogs[id]
            ;

        if (call && dialog) {
            call.setMuteVideo(dialog.setVideoMute('toggle'));
            // Helper.sendSession('changeCall', this.activeCalls);
        }
    }

    // endregion


    listCollection (collectionName, params, cb) {
        modelVerto.list(collectionName, params, cb);
    }

    addCollection (collectionName, params, cb) {
        modelVerto.add(collectionName, params, cb);
    }

    updateCollection (collectionName, id, params, cb) {
        modelVerto.update(collectionName, id, params, cb);
    }

    removeCollection (collectionName, id, cb) {
        modelVerto.remove(collectionName, id, cb);
    }
}