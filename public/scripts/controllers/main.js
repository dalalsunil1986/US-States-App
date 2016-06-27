'use strict';

angular.module('publicApp')
  .controller('MainCtrl', function ($scope, $location, UserService, $rootScope, CookieTest, AuthenticationService) {
    
    //check user's browser on page load if cookie is enabled
    $scope.cookieTest = CookieTest.testBrowserForCookie('test','test');
    if($scope.cookieTest){        
        CookieTest.cookie_enabled = true;
    }  
    
    // [2] Using the $location.path() function as a $watch expression
    $scope.$watch(function () {
        return $location.path();
    }, 
    function (path) {
        if (_.includes(path, 'states')) {        
          $scope.activeView = 'states';
        } else if (_.includes(path, 'guestbook')) {
          $scope.activeView = 'guestbook';
        }
        else{
            $scope.activeView = 'login';
        }
    });
    
    $scope.logOut = function(){
        UserService.logOut(function(result){
            $scope.isLogged = false;
            $scope.user = null;
            $location.path("/login");
        });
        
    };
    
    UserService.getUser(function(result){
        $scope.isLogged = true;
        $scope.user = result.user; 
        AuthenticationService.user = $scope.user; //set the authentication service on page reload
    });           
    
    $rootScope.$on('rootScope:emit', function (event, data) {  
            //check if auth service for user is set
            if(AuthenticationService.user){
                $scope.isLogged = true;
                $scope.user = AuthenticationService.user;
            }
    });
    
 });
