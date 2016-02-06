(function () {
    'use strict';

    MyApp.fw7 = {
        app : new Framework7({
        animateNavBackIcon: true
    }),
        options: {
        dynamicNavbar: true,
        domCache: true
    }, 
        views: []
    };

   
   MyApp.angular = angular.module('MyApp', []);
   MyApp.angular.constant("SERVER_API_URL","http://fiapi.radiumz.org:2052/api");
   MyApp.angular.constant("SERVER_AUDIO_URL","http://idioms.mindong.asia/assets/audio/");        

}());