angular.module('experiences').factory('Experiences',['$resource',function($resource){
    return $resource('api/experiences/:experienceId',{
        experienceId:'@_id'
    },{
        update:{
            method:'PUT'
        }
    
    });
}]);