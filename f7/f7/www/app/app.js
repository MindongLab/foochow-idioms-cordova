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
    MyApp.ns('MyApp.global');
    MyApp.constant.SERVER_API_URL="data/api/";
    MyApp.constant.SERVER_AUDIO_URL="audio/";
   
    window.setTimeout(function () {
        Dom7('.overlay.splashscreen').remove();
    }, 2000);
    


}());