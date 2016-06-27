'use strict';

/**
 * @ngdoc overview
 * @name publicApp
 * @description
 * # publicApp
 *
 * Main module of the application.
 */
angular
  .module('publicApp', [
    'ngCookies',
    'ngRoute',
    'restangular',
    'bw.paging',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider,RestangularProvider, $httpProvider, $provide) {   
    
    $httpProvider.interceptors.push('AuthInterceptor');    
    
    //this will store the document referrer info after login
    $provide.decorator('$document',function($delegate){
        $delegate.referrer = null;
        $delegate.params = {};
        return $delegate; 
    });
    
    // Set the base URL for Restangular.
    RestangularProvider
            .setBaseUrl('/')
            .setDefaultHttpFields({withCredentials: true});
    
    $routeProvider      
      .when('/states', {
        templateUrl: 'views/states.html',
        controller: 'StatesCtrl',
        controllerAs: 'states',        
        access: { requiredLogin: false }
      })
      .when('/states?page=:page&sort=:sortString', {
        templateUrl: 'views/states.html',
        controller: 'StatesCtrl',
        controllerAs: 'states',        
        access: { requiredLogin: false }
      })
      .when('/guestbook', {
        templateUrl: 'views/guestbook.html',
        controller: 'GuestbookCtrl',
        controllerAs: 'guestbook',        
        access: { requiredLogin: true }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',   
        access: { requiredLogin: false }
      })
      .otherwise({
        redirectTo: '/states',
        access: { requiredLogin: false }
      });
  })  
 .run(function($rootScope, $location, AuthenticationService, $cookies,$document) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {        
        if (nextRoute.access.requiredLogin && !$cookies.get('login') && !AuthenticationService.user) {            
            AuthenticationService.isLogged = false;
            //store the referrer page for redirect
            $document.params = nextRoute.params;                        
            $document.referrer = nextRoute.$$route.originalPath; 
            $location.path("/login");
        }
    });    
 });

