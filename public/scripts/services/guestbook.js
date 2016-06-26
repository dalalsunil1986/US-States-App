'use strict';

angular.module('publicApp')
  .factory('Guestbook', function(Restangular,$modal) {    
    return{
        getMessages: function(){
            return Restangular.service('read').getList();
        },
        guestBookModal : function(scope){
            return $modal({
                scope: scope,
                templateUrl: 'views/templates/add-message-modal.html',
                show: false       
            });
        },
        addMessage: function(phone,message,callback){
            if (phone !== undefined && message !== undefined) {                             
                Restangular.all('write').post({phone: phone, message: message}).then(function(result) {                    
                   callback(result);                   
                },function (result) {                   
                    callback(result);
                });                 
            }            
        }
    };
});
