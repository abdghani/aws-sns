angular.module('myapp').controller('demoCtrl',['$scope','ajaxFac','myConfig',function($scope,ajaxFac,myConfig){
    $scope.showSuccess = false;
    $scope.showFailure = false;
    $scope.failureMessage = '';
    $scope.sendSms = function(msg){
        if(!$scope.form.$invalid){
            msg.phoneNumber = msg.phoneNumber.toString();
            ajaxFac.httpPost('/api/sms/sendsms',msg,function(data){

                if(data !== undefined){
                   if(data.status === "success"){
                        $scope.showSuccess = true;
                        $scope.showFailure = false;  
                        setTimeout(function(){
                            $scope.showSuccess = false;
                        },2000);
                    }
                    else{
                        $scope.showSuccess = false;
                        $scope.showFailure = true;
                        $scope.failureMessage = data.info;
                        setTimeout(function(){
                            $scope.showFailure = false;
                        },2000);
                        
                    } 
                }
                else{
                        $scope.showSuccess = false;
                        $scope.showFailure = true;
                        $scope.failureMessage = "error sending";
                        setTimeout(function(){
                            $scope.showFailure = false;
                        },2000);
                }
                
            });
        }
        else{
                 $scope.showSuccess = false;
                 $scope.showFailure = true;
                 $scope.failureMessage = "invalid data";
                    setTimeout(function(){
                        $scope.showFailure = false;
                 },2000);
                
        }
    };
}]);