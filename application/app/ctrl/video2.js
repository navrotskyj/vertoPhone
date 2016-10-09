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

    $rootScope.confChangeVolume = (memberId, pos, $event) => {
        if (pos == 'up') {
            room.conf.volumeUp(memberId);
        } else {
            room.conf.volumeDown(memberId);
        }
        $event.stopPropagation();
    }

    $rootScope.confChangeGain = (memberId, pos, $event) => {
        if (pos == 'up') {
            room.conf.gainUp(memberId);
        } else {
            room.conf.gainDown(memberId);
        }
        $event.stopPropagation();
    }    

    $rootScope.confDeaf = (memberId, deafStatus, $event) => {
        if (room.confRole == 'moderator') {
            if (deafStatus) {
                room.conf.undeaf(memberId);
            } else {
                room.conf.deaf(memberId);
            }
        }
        $event.stopPropagation();
    }

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

    $rootScope.dialogShown = false;
    $rootScope.toggleModal = function() {
        $rootScope.dialogShown = !$rootScope.dialogShown;
    };

    $rootScope.activeTab = 'm';
    $rootScope.changeTab = (name) => {
        $rootScope.activeTab = name;
    }

    $rootScope.data = [
        {
            body: "message",
            direction: "inbound"
        },
        {
            body: "message",
            direction: "outbound"
        },{
            body: "message",
            direction: "inbound"
        },
        {
            body: "message",
            direction: "outbound"
        },{
            body: "message",
            direction: "inbound"
        },
        {
            body: "message",
            direction: "outbound"
        },{
            body: "message",
            direction: "inbound"
        },
        {
            body: "message",
            direction: "outbound"
        },{
            body: "message",
            direction: "inbound"
        },
        {
            body: "message",
            direction: "outbound"
        },
    ]
    
});


  app.provider("ngModalDefaults", function() {
    return {
      options: {
        closeButtonHtml: "<span class='ng-modal-close-x'>X</span>"
      },
      $get: function() {
        return this.options;
      },
      set: function(keyOrHash, value) {
        var k, v, _results;
        if (typeof keyOrHash === 'object') {
          _results = [];
          for (k in keyOrHash) {
            v = keyOrHash[k];
            _results.push(this.options[k] = v);
          }
          return _results;
        } else {
          return this.options[keyOrHash] = value;
        }
      }
    };
  });

  app.directive('modalDialog', [
    'ngModalDefaults', '$sce', function(ngModalDefaults, $sce) {
      return {
        restrict: 'E',
        scope: {
          show: '=',
          dialogTitle: '@',
          onClose: '&?'
        },
        replace: true,
        transclude: true,
        link: function(scope, element, attrs) {
          var setupCloseButton, setupStyle;
          setupCloseButton = function() {
            return scope.closeButtonHtml = $sce.trustAsHtml(ngModalDefaults.closeButtonHtml);
          };
          setupStyle = function() {
            scope.dialogStyle = {};
            if (attrs.width) {
              scope.dialogStyle['width'] = attrs.width;
            }
            if (attrs.height) {
              return scope.dialogStyle['height'] = attrs.height;
            }
          };
          scope.hideModal = function() {
            return scope.show = false;
          };
          scope.$watch('show', function(newVal, oldVal) {
            if (newVal && !oldVal) {
              document.getElementsByTagName("body")[0].style.overflow = "hidden";
            } else {
              document.getElementsByTagName("body")[0].style.overflow = "";
            }
            if ((!newVal && oldVal) && (scope.onClose != null)) {
              return scope.onClose();
            }
          });
          setupCloseButton();
          return setupStyle();
        },
        template: "<div class='ng-modal' ng-show='show'>\n  <div class='ng-modal-overlay' ng-click='hideModal()'></div>\n  <div class='ng-modal-dialog' ng-style='dialogStyle'>\n    <span class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></span>\n    <div class='ng-modal-close' ng-click='hideModal()'>\n      <div ng-bind-html='closeButtonHtml'></div>\n    </div>\n    <div class='ng-modal-dialog-content' ng-transclude></div>\n  </div>\n</div>"
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
