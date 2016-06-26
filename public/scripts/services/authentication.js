'use strict';

angular.module('publicApp')
.factory('AuthenticationService', function() {
    var auth = {
        isLogged: false        
    };     
    return auth;
});