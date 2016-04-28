angular.module('experiences').config(['$routeProvider',
function($routeProvider){
    $routeProvider.
    when('/experiences',{
        templateUrl:'experiences/views/list-experiences.client.view.html'
    }).
    when('/experiences/create',{
        templateUrl:'experiences/views/create-experience.client.view.html'
    }).
    when('/experiences/:experienceId',{
        templateUrl:'experiences/views/view-experience.client.view.html'
    }).
    when('/experiences/:experienceId/edit',{
        templateUrl:'experiences/views/edit-experience.client.view.html'
    });
 }
]);