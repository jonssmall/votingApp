var app = angular.module("votingApp", []);

app.controller("votingCtrl", function($scope, $http) {
	$scope.message = "Hello Main";
});


app.controller("userCtrl", function($scope, $http) {
	$scope.loggedIn = false;
	$scope.user;
	$http.get('/loggedIn').then(function(response) {
		console.log(response.data.github);
		$scope.loggedIn = response.data;
		$scope.user = response.data.github;
	}, function(error) {
		console.log(error);
	});
});