'use strict';

//Setting up route
angular.module('mean.schedule').config(['$stateProvider',
   function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all schedule', {
                url: '/schedule',
                templateUrl: 'public/views/schedule/schedule.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit event', {
                url: '/schedule/:eventId/edit',
                templateUrl: 'public/views/schedule/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('event by id', {
                url: '/schedule/:eventId',
                templateUrl: 'public/views/schedule/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);