const app = angular.module('videoCall', []),
    call = null,
    session = null;

app.run(($rootScope, $document, $timeout) => {
    window.init = (session, call) => {
        console.log('init', call, session);
        call = call;
        session = session;

        if (call.conferenceId && session.conference[call.conferenceId]) {
            let conf = session.conference[call.conferenceId];
            for (let key in conf.members) {
                $rootScope.members.push(conf.members[key]);
            }
            // TODO layers

            conf.onChange = (action, ms) => {
                $rootScope.members = [];
                for (let key in conf.members) {
                    $rootScope.members.push(conf.members[key]);
                }
                apply();
            }
            apply();
        }
    };

    
    $rootScope.members = [];

    $rootScope.layers = []

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