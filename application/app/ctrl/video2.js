const app = angular.module('videoCall', []);
app.run(($rootScope, $document) => {
    $rootScope.openSide = () => {
        document.getElementById("mySidenav").style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
    };
    //document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    $rootScope.closeSide = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    };
    $rootScope.members = [
        {
            'uuid': "554b9126-1524-965c-8549-416cc8bde50d",
            'id': "0017",
            'number': "100",
            'name': "Igor1",
            'codec': "opus@48000",
            'status': {
                "audio": {
                    "muted": false,
                    "deaf": false,
                    "onHold": false,
                    "talking": false,
                    "floor": true,
                    "energyScore": 0
                },
                "video": {
                    "visible": false,
                    "videoOnly": false,
                    "avatarPresented": false,
                    "mediaFlow": "sendOnly",
                    "muted": true,
                    "floor": false,
                    "reservationID": null,
                    "videoLayerID": -1
                },
                "oldStatus": "FLOOR VIDEO (BLIND)"
            },
            'email': {
                avatar: "../../../images/defaultUserPic.png",
                email: "navrotskyj@gmail.com"
            }
        },{
            'uuid': "554b9126-1524-965c-8549-416cc8bde50d",
            'id': "0017",
            'number': "100",
            'name': "Igor",
            'codec': "opus@48000",
            'status': {
                "audio": {
                    "muted": false,
                    "deaf": false,
                    "onHold": false,
                    "talking": false,
                    "floor": true,
                    "energyScore": 0
                },
                "video": {
                    "visible": false,
                    "videoOnly": false,
                    "avatarPresented": false,
                    "mediaFlow": "sendOnly",
                    "muted": true,
                    "floor": false,
                    "reservationID": null,
                    "videoLayerID": -1
                },
                "oldStatus": "FLOOR VIDEO (BLIND)"
            },
            'email': {
                avatar: "http://gravatar.com/avatar/c25f1d6e925b2402c40e849b20785f1b.png?s=600",
                email: "navrotskyj@gmail.com"
            }
        },{
            'uuid': "554b9126-1524-965c-8549-416cc8bde50d",
            'id': "0017",
            'number': "100",
            'name': "Igor",
            'codec': "opus@48000",
            'status': {
                "audio": {
                    "muted": false,
                    "deaf": false,
                    "onHold": false,
                    "talking": false,
                    "floor": true,
                    "energyScore": 0
                },
                "video": {
                    "visible": false,
                    "videoOnly": false,
                    "avatarPresented": false,
                    "mediaFlow": "sendOnly",
                    "muted": true,
                    "floor": false,
                    "reservationID": null,
                    "videoLayerID": -1
                },
                "oldStatus": "FLOOR VIDEO (BLIND)"
            },
            'email': {
                avatar: "http://gravatar.com/avatar/c25f1d6e925b2402c40e849b20785f1b.png?s=600",
                email: "navrotskyj@gmail.com"
            }
        },{
            'uuid': "554b9126-1524-965c-8549-416cc8bde50d",
            'id': "0017",
            'number': "100",
            'name': "Igor",
            'codec': "opus@48000",
            'status': {
                "audio": {
                    "muted": false,
                    "deaf": false,
                    "onHold": false,
                    "talking": false,
                    "floor": true,
                    "energyScore": 0
                },
                "video": {
                    "visible": false,
                    "videoOnly": false,
                    "avatarPresented": false,
                    "mediaFlow": "sendOnly",
                    "muted": true,
                    "floor": false,
                    "reservationID": null,
                    "videoLayerID": -1
                },
                "oldStatus": "FLOOR VIDEO (BLIND)"
            },
            'email': {
                avatar: "http://gravatar.com/avatar/c25f1d6e925b2402c40e849b20785f1b.png?s=600",
                email: "navrotskyj@gmail.com"
            }
        },{
            'uuid': "554b9126-1524-965c-8549-416cc8bde50d",
            'id': "0017",
            'number': "100",
            'name': "Igor",
            'codec': "opus@48000",
            'status': {
                "audio": {
                    "muted": false,
                    "deaf": false,
                    "onHold": false,
                    "talking": false,
                    "floor": true,
                    "energyScore": 0
                },
                "video": {
                    "visible": false,
                    "videoOnly": false,
                    "avatarPresented": false,
                    "mediaFlow": "sendOnly",
                    "muted": true,
                    "floor": false,
                    "reservationID": null,
                    "videoLayerID": -1
                },
                "oldStatus": "FLOOR VIDEO (BLIND)"
            },
            'email': {
                avatar: "http://gravatar.com/avatar/c25f1d6e925b2402c40e849b20785f1b.png?s=600",
                email: "navrotskyj@gmail.com"
            }
        },{
            'uuid': "554b9126-1524-965c-8549-416cc8bde50d",
            'id': "0017",
            'number': "100",
            'name': "Igor",
            'codec': "opus@48000",
            'status': {
                "audio": {
                    "muted": false,
                    "deaf": false,
                    "onHold": false,
                    "talking": false,
                    "floor": true,
                    "energyScore": 0
                },
                "video": {
                    "visible": false,
                    "videoOnly": false,
                    "avatarPresented": false,
                    "mediaFlow": "sendOnly",
                    "muted": true,
                    "floor": false,
                    "reservationID": null,
                    "videoLayerID": -1
                },
                "oldStatus": "FLOOR VIDEO (BLIND)"
            },
            'email': {
                avatar: "http://gravatar.com/avatar/c25f1d6e925b2402c40e849b20785f1b.png?s=600",
                email: "navrotskyj@gmail.com"
            }
        },
    ];
    $rootScope.activeMember = null;
    $rootScope.setActiveMember = m => {
        $rootScope.activeMember = m;
    };
    $rootScope.fullScreen = () => document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);

    console.log($document.find('#menu-icn'))
})



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
function init() {
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
        init();
    }
});