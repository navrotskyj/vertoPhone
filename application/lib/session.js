
// todo import helper

class Session {
	constructor (options = {}) {

        this.lastCallNumber = null;
        this.activeCalls = {};
        this.videoParams = {};

        this.vertoLogin = options.login;
        this.cidName = options.cidName || this.vertoLogin;
        this.cidNnumber = options.cidNnumber || this.vertoLogin;

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
                minWidth: videoParamsBest[this.selectedVideo].w,
                minHeight: videoParamsBest[this.selectedVideo].h,
                maxWidth: videoParamsBest[this.selectedVideo].w,
                maxHeight: videoParamsBest[this.selectedVideo].h,
                minFrameRate: 15
            }
        }

        this.isLogin = false;

        // TODO
        this._settings = option;

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
    }

    get vetoCallbacks () {
        // TODO move helper
        function addVideo(id) {
            var video = document.createElement('video');
            video.id = id;
            video.volume = 1;
            video.style.display = 'none';
            document.body.appendChild(video);
            return video
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

            onWSLogin: (e, success) => {
                console.info('onWSLogin', e, success);
                this.isLogin = success;
                if (success) {
                    Helper.createNotification(
                        'Login', 
                        'Success', 
                        'login ' + this.vertoLogin, 
                        'images/bell64.png', 
                        2000
                    );
                    this.sendLoginToExtension();
                } else {
                    Helper.createNotification(
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

            // TODO;
            onDialogState: (d) => {

            }

        }
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

    refreshDevicesList () {
        $.verto.init({skipPermCheck: true}, ()=> {});
    }

    getDevicesList () {
        return {
            audioInDevices: $.verto.audioInDevices,
            audioOutDevices: $.verto.audioOutDevices,
            videoDevices: $.verto.videoDevices,
        }
    }

    // region call controll

    makeCall (number, option = {}) {
        this.lastCallNumber = number;
        this.verto.newCall({
            destination_number: number,
            caller_id_name: this.cidName,
            caller_id_number: this.cidNnumber,

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
            return // ERROR
        }

        if (call.screenShareCall) {
            this.verto.dialogs[call.screenShareCall].hangup();
            return
        }

        this.verto.newCall({
            destination_number: call.calleeIdNumber + '-screen',
            caller_id_name: this.cidName,
            caller_id_number: this.cidNnumber,
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
            d.answer({
                useVideo: params && params.useVideo,
                callee_id_name: this.cidName,
                callee_id_number: this.cidNnumber
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
        const call = this.verto.dialogs[id];
        if (call) {
            call.dtmf(digit);
        }        
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

    // endregion

}