
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
