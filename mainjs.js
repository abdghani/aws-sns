angular.module('myapp',[
    'ngMaterial',
    'ui.router'
]);


angular.module('myapp').constant("myConfig", {
        "localurl": "http://localhost:3000",
        "url":"https://smsany.herokuapp.com"
});

angular.module('myapp').config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/home/home.html',
        controller:'homeCtrl'
    })
    .state('about', {
        url: '/about',
        templateUrl: '/about/about.html'
    })
    .state('access', {
        url: '/access',
        templateUrl: '/access/access.html',
        controller:'accessCtrl'
    })
    .state('demo', {
        url: '/demo',
        templateUrl: '/demo/demo.html',
        controller:'demoCtrl'
    })
    .state('api', {
        url: '/api',
        templateUrl: '/api/api.html',
        controller:'apiCtrl'
    })
    .state('implementation', {
        url: '/implementation',
        templateUrl: '/implementation/implementation.html',
        controller:'implementationCtrl'
    });
});


angular.module('myapp').factory('ajaxFac', function ($http) {
    
    return {
        httpPost: function (url, param, callback) {
            $http
                .post(url, param)
                .then(function (res) {
                    console.log(res);
                if(callback)
                    callback(res.data);
                })
                .catch(function (error) {
                    callback(error.data);
                });
        },
        httpGet: function (url, callback) {
            $http
                .get(url)
                .then(function (res) { callback(res.data); })
                .catch(function (error) {
                    callback(error.data);
                });
        }
    };
});
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
angular.module('myapp').controller('apiCtrl',['$scope',function($scope){
    
}]);
angular.module('myapp').controller('homeCtrl',['$scope',function($scope){

}]);
angular.module('myapp').controller('implementationCtrl',['$scope',function($scope){
    
}]);
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