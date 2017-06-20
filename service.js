var stService = angular.module("stService",[]);

stService.factory('DataService', function ($http, $rootScope, sessionService) {

    var DataService = {
        // UNIVERSAL GET REQUEST
        get: function (url) {
            var promise = $http({
                method: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                headers: { 'Content-Type': 'application/json', 'Authorization': sessionService.get('token_type') + ' ' + sessionService.get('access_token') }
            }).success(function (data, status, headers, config) {
                return data;
            }).error(function (data, status, headers, config) {
                return status;
                //alert("Error Occured.")
            })
            return promise;

        },
        //Login get request
          logingetService: function (url) {
            var promise = $http({
                method: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                headers: { 'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                return data;
            }).error(function (data, status, headers, config) {
                return status;
                //alert("Error Occured.")
            })
            return promise;

        },
        // UNIVERSAL POST REQUEST
        post: function (url, data) {
            var promise = $http({
                method: "POST",
                url: url,
                data: data,
                contentType: "application/json; charset=utf-8",
                headers: { 'Content-Type': 'application/json', 'Authorization': sessionService.get('token_type') + ' ' + sessionService.get('access_token') }
            }).success(function (data, status, headers, config) {

            }).error(function (data, status, headers, config) {
                return status;
            })
            return promise;

        },
        // UNIVERSAL PUT REQUEST
        put: function (url, data) {
            var promise = $http({
                method: "PUT",
                url: url,
                data: data,
                contentType: "application/json; charset=utf-8",
                headers: { 'Content-Type': 'application/json', 'Authorization': sessionService.get('token_type') + ' ' + sessionService.get('access_token') }
            }).success(function (data, status, headers, config) {

            }).error(function (data, status, headers, config) {
                //alert("Error Occured.")
                return status;
            })
            return promise;
        },
        // Log Service
        logService: function (url, data) {
            var promise = $http({
                method: "POST",
                url: url,
                data: data,
                contentType: "application/json; charset=utf-8",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {

            }).error(function (data, status, headers, config) {
                return status;
            })
            return promise;

        },
        // UNIVERSAL DELETE REQUEST
        delete: function (url) {
            var promise = $http({
                method: "DELETE",
                url: url,
                contentType: "application/json; charset=utf-8",
                headers: { 'Content-Type': 'application/json', 'Authorization': sessionService.get('token_type') + ' ' + sessionService.get('access_token') }
            }).success(function (data, status, headers, config) {
                return data
            }).error(function (data, status, headers, config) {
               // alert("Error Occured.");
                return status;
            })
            return promise;
        }
    }
    return DataService;
});
stService.factory('ErrorService', function ($http, sessionService, $rootScope, Notification) {
    var ErrorService = {
        ErrorHandler: function (message, status, headers, config, ctrlConfig) {
            if ($rootScope.ErrorHandler.DisplayError.indexOf(config.method) != -1) {
                if (ctrlConfig.display == true) {
                    switch (status) {
                        case 400:
                            Notification.error(message);
                            break;
                        case 401:
                            Notification.error(message);
                            break;
                        default:
                            Notification.error(message);
                            break
                    }
                }

            }
        }
    }
    return ErrorService;
});
stService.factory('commonFactory',function($rootScope,$timeout){
	return {
		chekInArray:function(parm){
			return ($rootScope.noValidationDatatypes.indexOf(parm) != -1) ? true : false;
		},
        resizeLeftBar: function(){
            $timeout(function(){
                var height = $(".st-framework-content-area").height();
                $(".st-menu-area").height(height);
            },1000)
        }
	}
})