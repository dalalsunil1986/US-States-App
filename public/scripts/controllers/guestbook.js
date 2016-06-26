'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:GuestbookCtrl
 * @description
 * # GuestbookCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('GuestbookCtrl', function ($scope,Guestbook,$cookies,$timeout) {        
        $scope.newMessage = {};
        $scope.success = false;
        $scope.user = $cookies.get('login');

        Guestbook.getMessages().then(function(msgs) {      
            $scope.msgs = msgs;  
        }); 
        
        var guestBookModal = Guestbook.guestBookModal($scope);        
        $scope.showGuestBookModal = function () {           
            guestBookModal.$promise.then(guestBookModal.show);
        };
        
        $scope.addGuestBookMessage = function(){            
            Guestbook.addMessage($scope.newMessage.phone,$scope.newMessage.message,function(result){
                if(result.status !== 401){                    
                    $scope.msgs.unshift({
                        phone: $scope.newMessage.phone,
                        message: $scope.newMessage.message,
                        user: $cookies.get('login')
                    });
                    $scope.newMessage = {};
                    guestBookModal.hide(); 
                    $scope.success = true;
                    $timeout(function(){
                        $scope.success = false;
                    },6000);
                }
            });
        };
  });
