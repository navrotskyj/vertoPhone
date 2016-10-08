

class Conference {
    constructor (v, dialog, pvtData, useVideo) {
        this.id = pvtData.conferenceMemberID;
        this.chattingWith = pvtData.chatID;
        this.confRole = pvtData.role;
        this.members = {};
        this.messages = [];
        this.callId = null;

        this.onChange = null;

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

        this.liveArray.onErr = (la, err) => {
            console.error('liveArray.onErr', la, err);
        };

        this.liveArray.onChange = (la, res) => {
            switch (res.action) {
                case 'bootObj':
                    let acctiveCalls = Helper.session && Helper.session.activeCalls,
                    callKeys = Object.keys(acctiveCalls || {});
                    res.data.forEach( m => {
                        let callId = m[0];
                        this.members[callId] = parseMember(m);

                        if (!this.callId && ~callKeys.indexOf(callId)) {
                            this.callId = callId;
                            this.members[callId].im = true;
                            acctiveCalls[callId].conferenceId = this.id;
                        }
                    });
                    this.onInit();
                    return;

                case 'add':
                    this.members[res.key] = parseMember(res.data);
                    break;
                
                case 'del':
                    delete this.members[res.key];
                    break;

                case 'clear':
                    this.members = {};
                    break;

                case 'modify':
                    this.members[res.key] = parseMember([res.key, res.data]);
                    break;
            }
            this.sendMessage('changeMembers', this.members)
        };
    }

    onInit () {

    }

    sendMessage (message, data) {
        if (this.onChange) {
            this.onChange(message, data);
        }
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
        this.members = {};
    }
}

function parseMember(member) {
    return {
        'uuid': member[0],
        'id': member[1][0],
        'number': member[1][1],
        'name': member[1][2],
        'codec': member[1][3],
        'status': JSON.parse(member[1][4]),
        'email': member[1][5].email
    };
}