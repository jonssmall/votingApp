var app = angular.module("votingApp", []);

app.controller("votingCtrl", function($scope, $http) {
	$scope.message = "Hello Main";
});

app.controller("pollCtrl", function($scope, $http) {
	$scope.name = "";
	$scope.options = [{body: "", votes:0}];
	$scope.addOption = function() {
		$scope.options.push({body: "", votes:0});
	}
	$scope.createPoll = function() {
		var postObject = {
			author: ngUsername,
			title: $scope.name,
			options: $scope.options
		};
		$http.post('/polls/new', postObject).then(function(response) {
			console.log(response);
		}, function(error) {
			console.log(error);
		});
	};
});

app.controller("userCtrl", function($scope, $http) {
	$scope.loggedIn = false;
	$scope.user;
	$http.get('/loggedIn').then(function(response) {
		if(response.data.github) {
			console.log(response.data.github);
			$scope.loggedIn = response.data;
			$scope.user = response.data.github;
			ngUsername = response.data.github.username; //too lazy for angular service to pass into pollCtrl
		}
	}, function(error) {
		console.log(error);
	});
});