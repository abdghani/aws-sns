angular.module('myapp').controller('accessCtrl',['$scope','ajaxFac','myConfig',function($scope,ajaxFac,myConfig){
    
    $scope.accessKey;
    $scope.showAccessKey = false;
    $scope.showAccessKeyFailure = false;

    $scope.showGetKey = false;
    $scope.showGetKeyFailure = false;

    $scope.getKey = function(user){
        if(!$scope.form.$invalid){
            ajaxFac.httpPost('/api/user/createUser',user,function(data){
                if(data !== null){
                    if(data.status == "failure"){
                        $scope.showAccessKeyFailure = true;  
                        $scope.showAccessKey = false;
                        $scope.failureMessage = data.reason; 
                    }
                    else{
                        $scope.showAccessKey = true;  
                        $scope.showAccessKeyFailure = false;
                        $scope.successMessage = data.accessKey;  
                    }
                }
                
            });
        }
    };

    $scope.retrieveKey = function(user){
        if(!$scope.forgetForm.$invalid){
            ajaxFac.httpPost('/api/user/getKey',user,function(data){
                if(data !== null){
                    if(data.status == "failure"){
                        $scope.showGetKeyFailure = true;  
                        $scope.showGetKey = false;
                        $scope.failureGetKeyMessage = data.reason; 
                    }
                    else{
                        $scope.showGetKey = true;  
                        $scope.showGetKeyFailure = false;
                        $scope.successGetKeyMessage = data.accessKey;  
                    }
                }
                
            });
        }
        else{
            console.log("invalid input");
        }
    };

}]);