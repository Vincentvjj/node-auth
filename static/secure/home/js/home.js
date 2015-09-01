'use strict';

angular.module('home', [])
    .constant('apiRoot', '/api')
    .controller('HomeController', function($scope, $http, $window, apiRoot) {
        function handleError(response) {
            $scope.error = response.data;
        }

        $http.get(apiRoot + '/roles')
            .then(function(response) {
                $scope.roles = response.data;
            })
            .catch(handleError);

        $http.get(apiRoot + '/users/me')
            .then(function(response) {
                $scope.user = response.data;
            })
            .catch(handleError);

        $scope.impersonate = function() {
            $http.post(apiRoot + '/users/impersonation', {userId: 2})
                .then(function(response) {
                    $window.location.reload();
                })
                .catch(handleError);
        };

        $scope.stopImpersonating = function() {
            $http.post(apiRoot + '/users/impersonation', {userId: null})
                .then(function(response) {
                    $window.location.reload();
                })
                .catch(handleError)
        };
    });