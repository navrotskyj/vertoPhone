console.log('init bg');


chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html',
    {
    	id: "vertoPhone",
	    innerBounds: {
	      width: 255,
	      height: 430,
	      minWidth: 255,
	      maxWidth: 255,
	      minHeight: 430
	    }
    });

 //  	var app = angular.module("app", []);

	// app.controller('PhoneCtrl', function ($scope, webitel) {
	// 	$scope.phone = webitel.phone;
	// 	console.log('call ctrl', new Date());
	// })
	// .service('webitel', function() {
	// 	console.log('call service', new Date());
	// 	var webitel = {
	// 		phone: {
	// 			activeNumber: '+380973080466',
	// 			history: []
	// 		}
	// 	};
	// 	return webitel;	
	// });

	// app.run(function() {
	// 	console.log('create window', new Date());
	  
	// });
});