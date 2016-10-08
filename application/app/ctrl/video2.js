const app = angular.module('videoCall', [])

app.run(($rootScope, $document, $timeout) => {
    let room,
        call;
    window.init = (session, call) => {
        console.log('init', call, session);
        room = call.conferenceId && session.conference[call.conferenceId];
        if (room) {
            for (let key in room.members) {
                $rootScope.members.push(room.members[key]);
            }
            
            $rootScope.layouts = room.layouts || [];

            room.onChange = (action, ms) => {
                $rootScope.members = [];
                for (let key in room.members) {
                    $rootScope.members.push(room.members[key]);
                }
                apply();
            }
            apply();
        }
    };

    $rootScope.data = {};
    $rootScope.$watch('data.layout', (v, oldV) => {
        if (v) {
            room.conf.setVideoLayout(v, null);
        }
    });
    $rootScope.selectedMemberId = "";
    $rootScope.selectMember = id => {
        if (id == $rootScope.selectedMemberId) {
            $rootScope.selectedMemberId = "";
        } else {
            $rootScope.selectedMemberId = id;
        }
    }

    $rootScope.layouts = [];

    $rootScope.confKick = (memberId, $event) => {
        room.conf.kick(memberId);
        $event.stopPropagation();
    }

    $rootScope.confSetVideoFloor = (memberId, $event) => {
        room.conf.videoFloor(memberId);
        $event.stopPropagation();        
    }

    $rootScope.confToggleMuteMic = (memberId, $event) => {
        room.conf.muteMic(memberId);
        $event.stopPropagation();
    }

    $rootScope.confToggleMuteVid = (memberId, $event) => {
        room.conf.muteVideo(memberId);
        $event.stopPropagation();
    }
    
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

    window.onSessionMessage = (action, data) => {
        console.log(action, data);
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
    
});

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