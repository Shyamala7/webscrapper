var app = angular.module('webscrapper',
						['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/list');

	$stateProvider

		.state('list',{
			url:'/list',
			templateUrl:'1.html',
			controller:'listCtrl'
		});
		
});


app.controller('listCtrl', function($scope, httpService) {

         httpService.get("http://localhost:8080/index").then(function(message){
         $scope.lists = JSON.parse(message);
      
       
        });
	
})



app.factory('httpService', function($http) {
  var httpService = {
  	 post: function (url, data) {
            var promise = $http({
                method: "POST",
                url: url,
                data: {'details':data},
                contentType: "application/json; charset=utf-8",
                headers: { 'Content-Type': 'application/json' }
            }).then(function (data, status, headers, config) {
            	return data.data;
            })
            return promise;

        },
    get: function(url) {
    	var promise = $http({
                method: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                headers: { 'Content-Type': 'application/json' }
            }).then(function (data, status, headers, config) {
            	return data.data;
            })
            return promise;

    }
    }
 
 return httpService;
});

