'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:StatesCtrl
 * @description
 * # StatesCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
.controller('StatesCtrl', function ($scope,States,$routeParams,$location) {
    
    var limit,offset;    
    $scope.state        = null;
    $scope.sortType     = (!$routeParams.sort ? 'name' : $routeParams.sort.replace(/[^a-zA-Z]/g, "")); // set the default sort type    
    $scope.sortString   = (!$routeParams.sort ? $scope.sortType : $routeParams.sort);
    $scope.sortReverse  = States.getSortDir($scope.sortString);
    $scope.totalStates  = States.totalCount;
    $scope.pageSize     = States.pageSize;
    $scope.currentPage  = (!$routeParams.page ? 1 : $routeParams.page);    
    
    //calculate limit and offset on paging
    limit               = $scope.currentPage *  $scope.pageSize;
    offset              = limit - $scope.pageSize;  
    
    $scope.sort         = function(type){        
        $scope.sortType    = type; 
        $scope.sortReverse = !$scope.sortReverse;        
        $scope.sortString  = States.getSortValue($scope.sortReverse) + type;
        //reload table again        
        States.renderTable(offset,limit,$scope.sortString,function(result){
            $scope.states = result;
        });
    };
    
    //fires on page change
    $scope.redirectPage = function(page){
        $location.url('states?page='+page+'&sort=' + $scope.sortString); 
    };    
    
    
    $scope.showStateModal = function (state) {
        $scope.state = States.getSingleState($scope.states,state);
        var state_modal = States.stateModal($scope);
        state_modal.$promise.then(state_modal.show);
    };
    
    //load the table with states on load
    States.renderTable(offset,limit,$scope.sortString,function(result){
        $scope.states = result;
    });
    
});
