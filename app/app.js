
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
            data: data,
        });
    }
});

var vertoPhone = angular.module("vertoPhone", ['app.callService', 'app.contacts', 'app.settings', 'app.chrome', 'app.dialpad', 'app.call']);

vertoPhone.constant('Tabs', {
    favorites: {
        name: 'Favorites',
        class: 'icon ion-ios-star-outline'
    },
    history: {
        name: 'History',
        class: 'icon ion-ios-clock-outline'
    },
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

vertoPhone.run(function($rootScope, $window, CallService) {
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

        document.title = $window.vertoSession && $window.vertoSession.vertoLogin
            ? $window.vertoSession.vertoLogin
            : 'No login.';
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
            $rootScope.currentViewTemplate = 'app/view/dialpad.html'
        }
        $rootScope.$apply();
    }

    $rootScope.activeTabName = 'dialpad';

    if (!$rootScope.inCall)
        changeState($rootScope.activeTabName);
    $rootScope.changeState = changeState;

    function changeState(stateName) {
        console.debug(arguments);
        $rootScope.activeTabName = stateName;
        $rootScope.currentViewTemplate = 'app/view/' + stateName + '.html'
    };
});

vertoPhone.controller('navigate', ['$rootScope', '$scope', 'Tabs', function ($rootScope, $scope, Tabs) {
    $scope.tabs = Tabs;

}]);

