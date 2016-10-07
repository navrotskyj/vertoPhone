

class Conference {
    constructor (v, dialog, pvtData, useVideo) {
        this.id = pvtData.conferenceMemberID;
        this.chattingWith = pvtData.chatID;
        this.confRole = pvtData.role;
        this.members = {};
        this.messages = [];

        this.conf = new $.verto.conf(v, {
            dialog: dialog,
            hasVid: useVideo,
            laData: pvtData,
            chatCallback: (v, e) => {

            },
            onBroadcast: function(v, conf, message) {
                console.log('>>> conf.onBroadcast:', arguments);
            }
        });

        if (this.confRole == "moderator") {
            console.log('>>> conf.listVideoLayouts();');
            this.conf.listVideoLayouts();
            this.conf.modCommand('canvasInfo');
        }

        this.liveArray = new $.verto.liveArray(
            v, 
            pvtData.laChannel,
            pvtData.laName, 
            {
                subParams: {
                    callID: dialog ? dialog.callID : null
                }
            }
        );

        this.liveArray.onErr = function(obj, args) {
            console.log('liveArray.onErr', obj, args);
        };

        this.liveArray.onChange = function(obj, args) {
            console.log('liveArray.onChange', obj, args);
        };
    }

    destroy () {
        console.log('destroy()');
        if (this.liveArray) {
            this.liveArray.destroy();
            console.log('Has liveArray.');
            this.liveArray = null;
        } else {
            console.log('Doesn\'t found data.liveArray.');
        }

        if (this.conf) {
            this.conf.destroy();
            this.conf = null;
        }
    }
}