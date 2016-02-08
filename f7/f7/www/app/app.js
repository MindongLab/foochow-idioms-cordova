(function () {
    'use strict';

    MyApp.fw7App = new Framework7({
        animateNavBackIcon: true,
        material: true,
        materialPageLoadDelay: 10,
        swipeout: false,
        sortable: false,
        pushState: true
    });
    var $$ = Dom7;
    
    MyApp.mainView = MyApp.fw7App.addView('.view-main');
    MyApp.ns('MyApp.constant');
    MyApp.constant.SERVER_API_URL="http://fiapi.radiumz.org:2052/api";
    MyApp.constant.SERVER_AUDIO_URL="audio/";
   
    Dom7('.overlay.splashscreen').remove();



}());