'use strict';

angular.module('mean.prof').controller('ProfileController', ['$scope','$rootScope', 'Restangular', 'Global', function ($scope, $rootScope, Global, Restangular) {  
        $scope.global = Global;

 		$scope.findOne = function() {        
       		$scope.user = Restangular.user.name;
    	};
}]);