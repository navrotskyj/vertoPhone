
var bg = angular.module('app.chrome', []);
bg.run(function ($rootScope) {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            $rootScope.$emit('bg:' + request.action, request.data)
        }
    );
    
    $rootScope.sendBg = function (action, data) {
        chrome.runtime.sendMessage({
            action: action,
            data: data
        });
    }
});

var vertoPhone = angular.module("vertoPhone", ['app.callService', 'app.contacts', 'app.history', 'app.favorites',
    'app.settings', 'app.chrome', 'app.dialpad', 'app.call']);

vertoPhone.constant('Tabs', {
    favorites: {
        name: 'Favorites',
        class: 'icon ion-ios-star-outline'
    },
    history: {
        name: 'History',
        class: 'icon ion-ios-clock-outline'
    },
    // chat: {
    //     name: 'Chat',
    //     class: 'icon ion-chatbubbles'
    // },
    contacts: {
        name: 'Contacts',
        class: 'icon icon-person'
    },
    dialpad: {
        name: 'Dialpad',
        class: 'icon ion-ios-keypad-outline'
    },
    settings: {
        name: 'Settings',
        class: 'icon icon-gear'
    }
});

vertoPhone.run(function($rootScope, $window, CallService, $timeout) {
    $rootScope.currentViewTemplate = '';
    $rootScope.session = null;
    $rootScope.activeCalls = [];
    $rootScope.activeCall = {};
    $rootScope.$on('bg:init', function (e, data) {
        if (data.hasOwnProperty('settings')) {
            $rootScope.vertoSettings = data.settings;
        }

        if (data.hasOwnProperty('activeCalls')) {
            setActiveCall(data.activeCalls);
        }

        $timeout(function () {
            $rootScope.isLoadApplication = true;
        });

        $rootScope.$on('bg:onWSLogin', function (e, data) {

            if (data.settings) {
                $rootScope.vertoSettings = data.settings;
            }
            if (data.success) {
                document.title = data.login;
                $rootScope.useVideo = $window.vertoSession.useVideo;
                $rootScope.isLoged = true;
                $rootScope.changeState('dialpad', false);
                $timeout(function () {
                    $rootScope.$apply()
                })
            } else {
                $rootScope.isLoged = false;
                $rootScope.changeState('settings', false);
            }
        });

        if ($window.vertoSession && $window.vertoSession.isLogin) {
            document.title = $window.vertoSession.vertoLogin;
            $rootScope.useVideo = $window.vertoSession.useVideo;
            $rootScope.isLoged = true;
            $rootScope.changeState(Object.keys($window.vertoSession.activeCalls).length == 0 ? 'dialpad' : 'call', false);
        } else {
            $rootScope.changeState('settings', false);
        }

    });
    $rootScope.$on('bg:changeCall', function (e, data) {
        console.log(data);
        setActiveCall(data);
    });
    
    $rootScope.setViewCall = function (call) {
        $rootScope.activeCall = call;
        if (call.state == 'held') {
            CallService.unholdCall(call.id)
        } else if (call.state == 'newCall') {
            if ($rootScope.activeCall && $rootScope.activeCall.state == 'active') {
                CallService.holdCall($rootScope.activeCall.id);
            }
        //     $rootScope.activeCall = call;
        }
        setCallView();

    };

    function setCallView() {
        $rootScope.currentViewTemplate = 'app/view/call.html'
    }

    function setActiveCall(data) {
        $rootScope.activeCalls = [];
        $rootScope.activeCall = null;

        for (var key in data) {
            var call = data[key];
            $rootScope.activeCalls.push(call);
            if (call.state == 'active') {
                $rootScope.activeCall = call;
            }
        }

        if (!$rootScope.activeCall && $rootScope.activeCalls.length > 0) {
            $rootScope.activeCall = $rootScope.activeCalls[0]
        }

        if ($rootScope.activeCalls.length > 0) {
            setCallView()
        } else {
            changeState($rootScope.activeTabName != 'call' && $rootScope.activeTabName != 'settings' 
                ? $rootScope.activeTabName
                : 'dialpad');
        }
        $rootScope.$apply();
    }

    $rootScope.activeTabName = 'dialpad';

    if (!$rootScope.inCall)
        changeState($rootScope.activeTabName);
    $rootScope.changeState = changeState;

    function changeState(stateName, isPage, data) {
        if (!$rootScope.isLoged) {
            stateName = 'settings';
        }
        console.debug(arguments);
        var newTemplate = stateName;
        
        $rootScope._prevActiveTabName = $rootScope.activeTabName;
        $rootScope.activeTabName = stateName;
        if (isPage) {
            newTemplate += 'Page'
        }
        $rootScope.currentViewData = data;
        $rootScope.currentViewTemplate = 'app/view/' + newTemplate + '.html';

    };

    $window.onkeydown = function (e) {
        $rootScope.$emit('key:down', e);
        return e.stopPropagation()
    };
});

vertoPhone.directive('uiToggle', function () {
    return {
        restrict: "AE",
        replace: true,
        scope: {
            ngModel: '='
        },
        template: `
            <div class="toggle" ng-class="{'active': ngModel}" ng-click="changeToggle()">
				<div class="toggle-handle"></div>
				<input type="checkbox" style="display: none;" ng-model="ngModel">
			</div>
        `,
        link: function (scope, el) {

            scope.changeToggle = function () {
                scope.ngModel = !scope.ngModel;
            }
        }
    }
});

vertoPhone.controller('navigate', ['$rootScope', '$scope', 'Tabs', function ($rootScope, $scope, Tabs) {
    $scope.tabs = Tabs;
}]);

