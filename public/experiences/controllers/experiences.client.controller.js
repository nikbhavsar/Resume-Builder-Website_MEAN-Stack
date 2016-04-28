angular.module('experiences').controller('ExperiencesController',['$scope',
'$routeParams','$location','Authentication','Experiences',
function($scope,$routeParams,$location,Authentication,Experiences){
	$scope.authentication=Authentication;
	
	
	$scope.create=function(){
		var experience=new Experiences({
			companyName:this.companyName,
			city:this.city,
            country: this.country,
            startDate: this.startDate,
            endDate: this.endDate,
            position: this.position,
            detail: this.detail
		});
	
	experience.$save(function(response){
		$location.path('experiences/'+response._id);
	},function(errorResponse){
		$scope.error=errorResponse.data.message;
	});
	
	};
	

	
	$scope.find=function(){
		$scope.experiences=Experiences.query();
	};
	$scope.findOne=function(){
		$scope.experience=Experiences.get({
			experienceId:$routeParams.experienceId
		});
	};
	
	$scope.update=function(){
		$scope.experience.$update(function(){
			$location.path('experiences/'+$scope.experience._id);
		},function(errorResponse){
			$scope.error=errorResponse.data.message;
		});
	};

	$scope.delete=function(experience){
	if(experience){
		experience.$remove(function(){
			for(var i in $scope.experiences){
				if($scope.experiences[i]==experience){
					$scope.experiences.splice(i,1);
				}
			}
		});
	} else{
		$scope.experience.$remove(function(){
			$location.path('experiences');
		});
	}	
	};	
	
}]);