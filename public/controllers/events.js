'use strict';

angular.module('mean.schedule').controller('ScheduleController', ['$scope', '$stateParams', '$rootScope', '$location', 'Global', 'Events', function ($scope, $stateParams, $rootScope, $location, Global, Events) {  
	$scope.global = Global;

	var date = new Date();
	var event;
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    /* event source that contains custom events on the scope */
    $scope.events = [];
    
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };

    /* alert on Drop */
    $scope.update = function(event){
       	event.$update();
       	$location.path('/schedule');
    };
    /* add custom event*/
    $scope.addEvent = function() {
      	event = new Events({
            title: 'New Event',
	    	allDay: true,
	    	start: new Date(y, m, d),
	    	end: new Date(y, m, d),
	    	className: ['openSesame'],
	    	editable: true,
	    	startEditable: true,
	    	durationEditable: true,
	    	color: '#ff0000',
	    	backgroundColor: '#ff0000',
	    	borderColor: '#ff0000',
	    	textColor: '#ffffff'
        });

        event.$save(function() {
        	$location.path('/schedule');
        });

        $scope.events.push(event);
    };
    $scope.editEvent = function(event) {
    	$location.path('/schedule/' + event._id);
    };
    /* remove event */
    $scope.remove = function(event) {
     if (event) {
            event.$remove();

            for (var i in $scope.events) {
                if ($scope.events[i] === event) {
                    $scope.events.splice(i, 1);
                }
            }
        }
        else {
            $scope.event.$remove();
            $location.path('/schedule');
        }
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      calendar.fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(calendar){
        calendar.fullCalendar('render');
      }
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 600,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        }, 
        eventDrop: $scope.update,
        eventResize: $scope.update,
        eventClick: $scope.editEvent
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];

    $scope.find = function() {
        Events.query(function(events) {
            for (var i=0; i<events.length; i++) {
            	$scope.events.push(events[i]);
            }
        });
    };

    $scope.findOne = function() {
        Events.get({
            eventId: $stateParams.eventId
        }, function(event) {
            $scope.event = event;
        });
    };
}]);