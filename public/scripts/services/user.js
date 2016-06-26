'use strict';

angular.module('publicApp')
.factory('UserService', function(Restangular,AuthenticationService,$cookies) {
    return {
        logIn: function(username, password, callback) {            
            if (username !== undefined && password !== undefined) {                             
                Restangular.all('login').post({user: username, password: password}).then(function(result) {                    
                    if($cookies.get('login') && $cookies.get('login') === username){
                       AuthenticationService.isLogged = true;                       
                       callback(result);                       
                    }
                },function (result) {                   
                    callback(result);
                });                 
            }            
        }, 
        logOut: function(callback) {
            Restangular.one('logout').get().then(function(result) {                    
                AuthenticationService.isLogged = false;               
                $cookies.remove('login');
                callback(result);
            });           
        }
        
    };
 });