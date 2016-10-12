const app = angular.module('videoCall', ['app.directive', 'ngSanitize']);

app.run(($rootScope, $document, $timeout) => {
    let room,
        _call,
        _session;

    const chatScrollTop = () => {
        const objDiv = document.getElementById("chatDataUl");
        objDiv.scrollTop = objDiv.scrollHeight;
    };

    const getMemberKeyByUuid = uuid => {
        for (let key in $rootScope.members) {
            if ($rootScope.members[key].uuid == uuid)
                return key;
        }
        return -1;
    };

    const localMemberChangeMedia = m => {
        if (m.status && m.status.audio) {
            $rootScope.muteLocalAudio = m.status.audio.muted;
        }

        if (m.status && m.status.video) {
            $rootScope.muteLocalVideo = m.status.video.muted;
        }
    };

    $rootScope.messages = [];
    $rootScope.modalDialog = {};
    $rootScope.unReadMessageCount = 0;
    $rootScope.isConf = false;
    $rootScope.screenShareCall = false;
    $rootScope.screenShareCallDirection = null;
    $rootScope.useVideo = false;
    $rootScope.isModerator = false;
    window.init = (session, call) => {
        console.log('init', call, session);
        _call = call;
        _session = session;
        $rootScope.startTime = call.onActiveTime;
        $rootScope.muteLocalAudio = !!call.mute;
        $rootScope.muteLocalVideo = !!call.muteVideo;
        $rootScope.useVideo = !!call.useVideo;
        $rootScope.screenShareCall = !!call.screenShareCall;
        call.onChange = action => {
            switch (action) {
                case 'removeScreenShareCall':
                    $rootScope.screenShareCall = false;
                    $rootScope.screenShareCallDirection = null;
                    break;

                case 'setScreenShareCall':
                    $rootScope.screenShareCall = true;
                    $rootScope.screenShareCallDirection = angular.copy(_call.screenShareCallDirection);
                    break;
            }
            apply();
        };

        room = call.conferenceId && session.conference[call.conferenceId];

        if (call.screenShareCall && !room) {
            $rootScope.screenShareCall = true;
            $rootScope.screenShareCallDirection = angular.copy(_call.screenShareCallDirection);
        }

        if (room) {
            $rootScope.isConf = true;
            for (let key in room.members) {
                $rootScope.members.push(angular.copy(room.members[key]));
                if (key == room.callId) {
                    let myInfo =  room.members[key];
                    localMemberChangeMedia(myInfo);
                }
            }
            $rootScope.isModerator = room.confRole == 'moderator';
            $rootScope.layouts = angular.copy(room.layouts) || [];
            $rootScope.layoutsInfo = angular.copy(room.layoutsInfo) || {};
            $rootScope.messages = angular.copy(room.messages);
            $rootScope.canvasInfo = angular.copy(room.canvasInfo);

            room.onChange = (action, data) => {
                let key;
                switch (action) {
                    case 'addMessage':
                        if ($rootScope.activeTab != 'c') {
                            $rootScope.unReadMessageCount++;
                        }
                        $rootScope.messages.push(angular.copy(data));
                        $timeout(() => chatScrollTop(), 500);
                        break;
                    case 'changeMembers:add':
                        $rootScope.members.push(angular.copy(data));
                        break;
                    case 'changeMembers:del':
                        key = getMemberKeyByUuid(data);
                        if (key === -1) {
                            return console.error('No found member');
                        }

                        $rootScope.members.splice(key, 1);
                        break;
                    case 'changeMembers:clear':
                        $rootScope.members = [];
                        break;
                    case 'changeMembers:modify':
                        key = getMemberKeyByUuid(data.uuid);
                        if (key === -1) {
                            return console.error('No found member');
                        }

                        angular.extend($rootScope.members[key], data);

                        if (data.uuid == room.callId) {
                            localMemberChangeMedia(data);
                        }
                        break;

                    case 'changeConvas':
                        $rootScope.canvasInfo = angular.copy(data);
                        break;

                }
                apply();
            };
        }
        apply();
    };

    $rootScope.message = "";
    $rootScope.sendChat = ($event) => {
        $event.stopPropagation();
        if (!$rootScope.message)
            return;
        room.conf.sendChat($rootScope.message);
        $rootScope.message = "";
    };

    $rootScope.hangupCall = () => {
        _session.dropCall(_call.id);
    };

    $rootScope.data = {};
    $rootScope.$watch('data.layout', (v, oldV) => {
        if (v) {
            room.setVideoLayout(v, null);
        }
    });

    $rootScope.confResId = (mId, v) => {
        room.setVidResId(mId, v);
    };

    $rootScope.selectedMemberId = "";
    $rootScope.selectMember = id => {
        if (id == $rootScope.selectedMemberId) {
            $rootScope.selectedMemberId = "";
        } else {
            $rootScope.selectedMemberId = id;
        }
    };

    $rootScope.layouts = [];

    $rootScope.confChangeVolume = (memberId, pos, $event) => {
        if (pos == 'up') {
            room.conf.volumeUp(memberId);
        } else {
            room.conf.volumeDown(memberId);
        }
        $event.stopPropagation();
    };

    $rootScope.confChangeGain = (memberId, pos, $event) => {
        if (pos == 'up') {
            room.conf.gainUp(memberId);
        } else {
            room.conf.gainDown(memberId);
        }
        $event.stopPropagation();
    };

    $rootScope.confDeaf = (memberId, deafStatus, $event) => {
        if (room.confRole == 'moderator') {
            if (deafStatus) {
                room.conf.undeaf(memberId);
            } else {
                room.conf.deaf(memberId);
            }
        }
        $event.stopPropagation();
    };

    $rootScope.confKick = (memberId, $event) => {
        room.conf.kick(memberId);
        $event.stopPropagation();
    };

    $rootScope.confSetVideoFloor = (memberId, $event) => {
        room.conf.videoFloor(memberId);
        $event.stopPropagation();        
    };

    $rootScope.toggleMuteMic = (memberId, $event) => {
        if (room) {
            room.conf.muteMic(memberId || room.id);
        } else {
            _session.toggleMute(_call.id);
            $rootScope.muteLocalAudio = !!_call.mute;
        }
        $event.stopPropagation();
    };

    $rootScope.toggleMuteVid = (memberId, $event) => {
        if (!$rootScope.useVideo) return;
        if (room) {
            room.conf.muteVideo(memberId || room.id);
        } else {
            _session.toggleMuteVideo(_call.id);
            $rootScope.muteLocalVideo = !!_call.muteVideo;
        }
        $event.stopPropagation();
    };

    $rootScope.dtmf = (digit, $event) => {
        _session.dtmf(_call.id, digit);
        $event.stopPropagation();
    };

    $rootScope.screenShare = ($event) => {
        _session.screenShare(_call.id, {});
        $event.stopPropagation();
    };

    $rootScope.transfer = (id, $event) => {
        $rootScope.modalDialog.open(
            {
                title: "Transfer party?",
                text: "To what destination would you like to transfer this call?"
            },
            (val) => {
                if (val) {
                    room.conf.transfer(id, val);
                }
            }
        );
        $event.stopPropagation();
    };

    const setBanner = (id, val) => {
        room.conf.banner(id, val);
    };
    $rootScope.setBanner = setBanner;

    $rootScope.confPlayFile = ($event) => {
        $rootScope.modalDialog.open(
            {
                title: "Play",
                text: "Please, enter filename"
            },
            (val) => {
                if (val) {
                    room.conf.play(val);
                }
            }
        );
        $event.stopPropagation();
    };

    $rootScope.confStopFile = ($event) => {
        room.conf.stop();
        $event.stopPropagation();
    };

    $rootScope.confStartRecord = ($event) => {
        $rootScope.modalDialog.open(
            {
                title: "Start record",
                text: "Please, enter filename"
            },
            (val) => {
                if (val) {
                    room.conf.record(val);
                }
            }
        );
        $event.stopPropagation();
    };

    $rootScope.confStopRecord = ($event) => {
        room.conf.stopRecord();
        $event.stopPropagation();
    };

    $rootScope.confBanner = (id, $event) => {
        $rootScope.modalDialog.open(
            {
                title: "Set banner",
                text: "Please insert the banner text"
            },
            (val) => {
                if (val) {
                    setBanner(id, val);
                }
            }
        );
        $event.stopPropagation();
    };
    
    $rootScope.members = [];

    $rootScope.initPage = true;
    $timeout(() => {
        $rootScope.initPage = false;
    }, 5000);
    $rootScope.activeMember = null;
    $rootScope.setActiveMember = m => {
        $rootScope.activeMember = m;
    };

    function apply() {
        $timeout(() => {
            $rootScope.$apply();
        })
    }


    $rootScope.isFullScreen = false;
    $rootScope.toggleFullScreen = () => {
        if (document.webkitCurrentFullScreenElement) {
            document.webkitExitFullscreen();
            $rootScope.isFullScreen = false;
        } else {
            document.body.webkitRequestFullscreen();
            $rootScope.isFullScreen = true;
        }
        apply();
    };

    $rootScope.dialogShown = false;
    $rootScope.toggleModal = function() {
        $rootScope.dialogShown = !$rootScope.dialogShown;
    };

    $rootScope.activeTab = 'm';
    $rootScope.changeTab = (name) => {
        $rootScope.activeTab = name;
        if (name == 'c') {
            $rootScope.unReadMessageCount = 0;
        }
    };

    $rootScope.dialpadOpen = false;
    $rootScope.toggleDialpad = ($event) => {
        $rootScope.dialpadOpen = !$rootScope.dialpadOpen;
        $event.stopPropagation();
    };

    $rootScope.fix = $event => $event.stopPropagation();

    $rootScope.dropdownOpened = '';
    $rootScope.openConvasMenu = id => {
        if ($rootScope.dropdownOpened == id) {
            $rootScope.dropdownOpened = '';
            return;
        }
        $rootScope.dropdownOpened = id;
    }
    
});

app.directive('modalDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            dialog: '='
        },
        replace: true,
        link: function(scope, element, attrs) {
            var setupStyle, callback;
            scope.show = false;
            scope.inputData = '';

            scope.dialog.open = (param = {}, cb) => {
                scope.hideModal();
                scope.dialogTitle = param.title;
                scope.dialogText = param.text;
                callback = cb;
                scope.show = true;
            };

            setupStyle = () => {
                scope.dialogStyle = {};
                if (attrs.width) {
                    scope.dialogStyle['width'] = attrs.width;
                }
                if (attrs.height) {
                    return scope.dialogStyle['height'] = attrs.height;
                }
            };

            scope.hideModal = () => {
                callback = null;
                scope.inputData = '';
                return scope.show = false;
            };

            scope.handleOk = () => {
                if (typeof callback == 'function') {
                    callback(angular.copy(scope.inputData));
                }
                scope.hideModal();
            };

            scope.$watch('show', function(newVal, oldVal) {
                if (newVal && !oldVal) {
                    document.getElementsByTagName("body")[0].style.overflow = "hidden";
                } else {
                    document.getElementsByTagName("body")[0].style.overflow = "";
                }
            });

            return setupStyle();
        },
        template: `<div class='ng-modal' ng-show='show'>
                        <div class='ng-modal-overlay' ng-click='hideModal()'></div>
                        <div class='ng-modal-dialog' ng-style='dialogStyle'>
                            <span class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></span>
                            <div class='ng-modal-close' ng-click='hideModal()'>
                                <span class='ng-modal-close-x'>X</span>
                            </div>
                            <div class='ng-modal-dialog-content'>
                                <form>
                                    <h3>{{dialogText}}</h3>
                                    <input ng-model="inputData" type="text" />
                                    <div class="bar">
                                        <button ng-click="handleOk()">Ok</button>
                                        <button ng-click='hideModal()'>Cancel</button>
                                    </div>
                                </form>                            
                            </div>
                        </div>
                    </div>`
        };
    }
]);


//Exelent little functions to use any time when class modification is needed
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

//Add event from js the keep the marup clean
function initMenu() {
    document.getElementById("menu-toggle").addEventListener("click", toggleMenu);
}

//The actual fuction
function toggleMenu() {
    var ele = document.getElementsByTagName('body')[0];
    if (!hasClass(ele, "open")) {
        addClass(ele, "open");
    } else {
        removeClass(ele, "open");
    }
}

//Prevent the function to run before the document is loaded
document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
        initMenu();
    }
});
