'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('LoginCtrl', function ($scope, UserService, $location, $rootScope, $timeout,$document,CookieTest) {
        $scope.error = false;
        $scope.cookieTest = CookieTest.cookie_enabled;
        
        $scope.logIn = function logIn(username, password) {            
            UserService.logIn(username, password, function(res){
                if(res.status !== 401){                 
                  var referrer = $document.referrer,
                  params = $document.params;
                  $rootScope.$emit('rootScope:emit', 'authenticated - login'); // notify the main controller
                  $scope.error = false;
                  //set back referrer data to original values
                  $document.referrer = null;
                  $document.params = {};
                  (referrer ? $location.path(referrer).search(params):$location.path("/states"));                                   
                }
                else{
                    //show our login error to user
                    $scope.error = true;
                    $timeout(function(){
                        $scope.error = false;
                    },5000);
                }                
            });            
        };
  });
