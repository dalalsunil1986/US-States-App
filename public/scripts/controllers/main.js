'use strict';

angular.module('publicApp')
  .controller('MainCtrl', function ($scope, $location, $cookies, UserService, $rootScope, CookieTest) {
    
    //check user's browser on page load if cookie is enabled
    $scope.cookieTest = CookieTest.testBrowserForCookie('test','test');
    if($scope.cookieTest){        
        CookieTest.cookie_enabled = true;
    }
            
    $scope.isLogged = ($cookies.get('login')?true:false);
    $scope.user = ($cookies.get('login')?$cookies.get('login'):null);
    
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
    
    $rootScope.$on('rootScope:emit', function (event, data) {
       if(data && data.route === 'login' && data.result === true){
           $scope.isLogged = true;
           $scope.user = $cookies.get('login');
       }
    });
    
 });
