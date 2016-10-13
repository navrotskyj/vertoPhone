

class Conference {
    constructor (v, dialog, pvtData, useVideo) {
        this.id = pvtData.conferenceMemberID;
        this.chattingWith = pvtData.chatID;
        this.confRole = pvtData.role;
        this.name = pvtData.laName;
        this.members = {};
        this.messages = [];
        this.callId = null;

        this.onChange = null;
        this.layouts = [];
        this.layoutsInfo = {};
        this.convasInfo = null;

        this.conf = new $.verto.conf(v, {
            dialog: dialog,
            hasVid: useVideo,
            laData: pvtData,
            chatCallback: (v, e) => {
                if (e.data.action == 'send')
                    return;
                const m = e.data;
                m.my = Helper.session.vertoLogin == m.from;
                m.date = new Date().toLocaleTimeString();
                this.messages.push(m);
                this.sendMessage('addMessage', m);
            },
            onBroadcast: (v, conf, message) => {
              if (message.action == 'response') {
                // This is a response with the video layouts list.
                if (message['conf-command'] == 'list-videoLayouts') {
                  let layouts = [];

                  for (let i in message.responseData) {
                    layouts.push(message.responseData[i].name);
                    this.layoutsInfo[message.responseData[i].name] = message.responseData[i];
                  }

                  let sortLayouts = layouts.sort((a, b) => {
                    let ga = a.substring(0, 6) == "group:" ? true : false;
                    let gb = b.substring(0, 6) == "group:" ? true : false;

                    if ((ga || gb) && ga != gb) {
                      return ga ? -1 : 1;
                    }

                    return ( ( a == b ) ? 0 : ( ( a > b ) ? 1 : -1 ) );
                  });
                //   data.confLayoutsData = message.responseData;
                  this.layouts = sortLayouts;
                } else if (message['conf-command'] == 'canvasInfo') {
                    if (message.responseData instanceof Array && message.responseData.length == 1
                        && this.layoutsInfo.hasOwnProperty(message.responseData[0].layoutName)) {

                        this.canvasInfo = this.layoutsInfo[message.responseData[0].layoutName];
                    } else {
                        // TODO
                        console.error(`Hmmmmmmmmmmmmmmmmm`);
                    }


                } else if (message["conf-command"].indexOf(`${this.name} vid-layout `) == 0) {
                    try {
                        const l = message["conf-command"].substring(`${this.name} vid-layout `.length).split(' ');
                        if (this.layoutsInfo.hasOwnProperty(l[0])) {
                            console.debug(`Change layout ${l[0]}`);
                            this.canvasInfo = this.layoutsInfo[l[0]];
                            this.sendMessage(`changeConvas`, this.canvasInfo);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
              }
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
            let data = {};
            switch (res.action) {
                case 'bootObj':
                    let activeCalls = Helper.session && Helper.session.activeCalls,
                        callKeys = Object.keys(activeCalls || {});
                    res.data.forEach( m => {
                        let callId = m[0];
                        this.members[callId] = parseMember(m);

                        if (!this.callId && ~callKeys.indexOf(callId)) {
                            this.callId = callId;
                            this.members[callId].im = true;
                            activeCalls[callId].conferenceId = this.id;

                            const w = chrome.app.window.get(callId);
                            if (w && w.contentWindow.init) {
                                w.contentWindow.init(Helper.session, activeCalls[callId]);
                            }
                        }
                    });
                    this.onInit();
                    return;

                case 'add':
                    data = parseMember([res.key, res.data]);
                    this.members[res.key] = data;
                    break;

                case 'del':
                    delete this.members[res.key];
                    data = res.key;
                    break;

                case 'clear':
                    this.members = {};
                    break;

                case 'modify':
                    data = parseMember([res.key, res.data]);
                    this.members[res.key] = data;
                    break;
            }
            this.sendMessage(`changeMembers:${res.action}`, data);
        };
    }

    setVideoLayout (id, params) {
        const resIDS = this.layoutsInfo[id] && this.layoutsInfo[id].resIDS;
        this.conf.setVideoLayout(id, params);


        let m;
        for (let key in this.members) {
            m = this.members[key];
            let resId = m.status.video && m.status.video.reservationID;
            if (!resId || resIDS && ~resIDS.indexOf(resId))
                continue;
            console.debug("clearing resid [" + resId + "] from [" + m.id + "]");
            this.setVidResId(m.id, resId);
        }
    }

    setVidResId (memberId, resId) {
        this.conf.modCommand('vid-res-id', memberId, resId)
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