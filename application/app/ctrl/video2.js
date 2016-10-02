const app = angular.module('videoCall', []);
app.run(($rootScope) => {
    $rootScope.openSide = () => {
        document.getElementById("mySidenav").style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
    };
    //document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    $rootScope.closeSide = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    };

    $rootScope.members = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
})