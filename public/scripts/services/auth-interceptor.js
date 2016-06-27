angular.module('publicApp')
.factory('AuthInterceptor', function ($q, $cookies, $location, AuthenticationService) {
    return {       
        response: function (response) {            
            if (response !== null && response.status === 200 && $cookies.get('login') && !AuthenticationService.isLogged) {                
                AuthenticationService.isLogged = true;
            }
            return response || $q.when(response);
        },      
        responseError: function(rejection) {
            if (rejection !== null && rejection.status === 401 && ($cookies.get('login') || AuthenticationService.isLogged)) {
                $cookies.remove('login');
                AuthenticationService.isLogged = false;                
                AuthenticationService.user = null;                
                $location.path("/login");
            }
 
            return $q.reject(rejection);
        }
    };
});

