'use strict';

angular.module('publicApp')
  .service('States', function (Restangular,$modal) {
    
    this.totalCount = 50;
    this.pageSize  = 10;
    
    this.renderTable         = function(offset,limit,sortString,callback){
        Restangular.service('states').getList({ offset: offset, limit: limit , sort: sortString}).then(function(states) {      
          callback(states);
        });       
    };
    
    this.getSortValue   = function(sortReverse){
                            if(!sortReverse){
                                return '';
                            }
                            return '-';
                         };
                         
    this.getSortDir     = function(sortString){
                             if(sortString.indexOf('-') === -1){
                                 return false;
                             }
                             return true;
                          }; 
                          
    this.getSingleState = function(states,stateAbbr){
                            var match_state = false,                            
                            i,
                            len = states.length,
                            state;
                            for (i = 0; i < len; i = i + 1) {
                                state = states[i];                                
                                if (state.abbreviation === stateAbbr){
                                    match_state = state;
                                    break;
                                }
                            }
                            return match_state;
                          };
                          
    this.stateModal     = function(scope){
                            return $modal({
                                scope: scope,
                                templateUrl: 'views/templates/state-modal.html',
                                show: false       
                            });
                          };
   
  });
