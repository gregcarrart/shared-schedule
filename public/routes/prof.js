'use strict';

//Setting up route
angular.module('mean.prof').config(['$stateProvider',
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
            .state('profile', {
                url: '/profile',
                templateUrl: 'public/views/profile/profile.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);