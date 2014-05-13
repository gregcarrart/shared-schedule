'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.schedule').factory('Events', ['$resource', function($resource) {
    return $resource('schedule/:eventId', {
        eventId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);