/**
 * Created by igor on 19.09.16.
 */

"use strict";
    
angular
    .module('app.call', ['app.callService'])
    .controller('callCtrl', function ($scope, CallService, $rootScope) {

        var onKeyUp = $rootScope.$on('key:down', function (e, key) {
            if (key.target.nodeName == "INPUT") return;
            var myKey = true;

            if (key.keyCode == 77) {
                toggleMute(getActiveCallId());
            } else if (key.keyCode == 72) {
                toggleHold(getActiveCallId());
            } else if (between(key.keyCode, 48, 57) || between(key.keyCode, 96, 105)) {
                dtmf(key.key)
            } else if (key.keyCode == 13 || key.keyCode == 65 ) {
                answerCall(getActiveCallId())
            } else if (key.keyCode == 81) {
                dropCall(getActiveCallId())
            } else {
                myKey = false;
            }

            if (myKey) {
                key.preventDefault();
                $scope.$apply();
            }
        });

        $scope.$on('$destroy', function () {
            onKeyUp();
        });
        
        function getActiveCallId() {
            return $rootScope.activeCall && $rootScope.activeCall.id;
        };

        $scope.openVideo = function (call) {
            CallService.openVideo(call.id);
        };

        $scope.screenShare = screenShare;
        $scope.dropCall = dropCall;
        $scope.answerCall = answerCall;
        $scope.holdCall = holdCall;
        $scope.unholdCall = unholdCall;
        $scope.toggleHold = toggleHold;
        $scope.toggleMute = toggleMute;
        $scope.transfer = transfer;
        $scope.openMenu = openMenu;
        $scope.dtmf = dtmf;

        function screenShare(id) {
            CallService.screenShare(id, {});
        }
        function answerCall(id, useVideo) {
            CallService.answerCall(id, {
                useVideo: useVideo
            });
        }

        function holdCall(id) {
            CallService.holdCall(id);
        }

        function unholdCall(id) {
            CallService.unholdCall(id);
        }

        function toggleHold(id) {
            CallService.toggleHold(id);
        }

        function toggleMute(id) {
            CallService.toggleMute(id);
        }

        function transfer(id, dest) {
            CallService.transfer(id, dest);
        }

        function openMenu(id, name) {
            CallService.openMenu(id, name);
        }

        function dtmf(d) {
            if ($scope.activeCall)
                CallService.dtmf($scope.activeCall.id, d);
        }

        function dropCall(id) {
            CallService.dropCall(id);
        }

        function between(x, min, max) {
            return x >= min && x <= max;
        }
    })
    .directive('uiVideoCall', function (CallService) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                callId: "=",
                videoOn: "="
            },
            template: '<video volume="0" id="{{callId}}"></video>',
            link: function (scope, el) {
                var $video = el[0];
                scope.$watch('videoOn', function (video) {
                    if (video) {
                        var stream = CallService.getCallStream(scope.callId);
                        if (stream) {
                            $video.srcObject = stream.remoteStream;
                            $video.volume = 0;
                            $video.play()
                        }
                    }
                });
            }
        }
    })
    .directive('uiTimer', function () {
        return {
            restrict: 'A',
            scope: {start: "=start"},
            link: function(scope, ele) {
              var checkTime, startTimer;

              startTimer = function() {
                if (scope.$$destroyed)
                    return;
                var m, s, time, t;

                if (!scope.start) {
                    ele.html("00:00");
                    return t = setTimeout(startTimer, 1000);
                }
                s = Math.floor((Date.now() - scope.start) / 1000);
                m = Math.floor(s / 60);
                m = checkTime(m);
                s = checkTime(s % 60);
                time = m + ":" + s;
                ele.html(time);
                return t = setTimeout(startTimer, 1000);
              };
              checkTime = function(i) {
                if (i < 10) {
                  i = "0" + i;
                }
                return i;
              };
              return startTimer();
            }

        }
    });