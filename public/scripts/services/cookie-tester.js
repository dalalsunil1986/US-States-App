'use strict';

angular.module('publicApp')
.factory('CookieTest', function($cookieStore) {     
    return {
       cookie_enabled: false, 
       testBrowserForCookie: function(key,value){
           $cookieStore.put(key, value);
           return $cookieStore.get(key);
       }      
    };
 });  