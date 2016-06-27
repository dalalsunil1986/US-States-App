'use strict';

angular.module('publicApp')
.factory('UserService', function(Restangular,AuthenticationService,$cookies) {
    return {
        logIn: function(username, password, callback) { 
            var oThis = this;
            if (username !== undefined && password !== undefined) {                             
                Restangular.all('login').post({user: username, password: password}).then(function(result) {                  
                    AuthenticationService.isLogged = true;
                    //get the user's info once authenticated
                    oThis.getUser(function(result){
                        AuthenticationService.user = result.user;
                        callback(result);   
                    });
                                        
                },function (result) {                   
                    callback(result);
                });                 
            }            
        }, 
        logOut: function(callback) {
            Restangular.one('logout').get().then(function(result) {                    
                AuthenticationService.isLogged = false;
                AuthenticationService.user = null;
                $cookies.remove('login');
                callback(result);
            });           
        },
        getUser: function(callback){  
            if(!$cookies.get('login') && !AuthenticationService.user){
                return false;
            }
            Restangular.one('/secret').get().then(function(result) {            
                callback(result);
            });           
        }
        
    };
 });