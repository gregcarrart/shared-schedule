'use strict';

//Setting up route
angular.module('mean.articles').config(['$stateProvider',
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
            .state('all articles', {
                url: '/articles',
                templateUrl: 'public/views/articles/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create article', {
                url: '/articles/create',
                templateUrl: 'public/views/articles/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit article', {
                url: '/articles/:articleId/edit',
                templateUrl: 'public/views/articles/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('article by id', {
                url: '/articles/:articleId',
                templateUrl: 'public/views/articles/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
