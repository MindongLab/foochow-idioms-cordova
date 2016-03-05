(function () {
    'use strict';

    MyApp.fw7App = new Framework7({
        animateNavBackIcon: true,
        swipeBackPage:true,
        scrollTopOnStatusbarClick:true,
        cache:false,
        swipeout: false,
        sortable: false,
        pushState: true,
        init: false
    });
    var $$ = Dom7;
    MyApp.fw7App.onPageInit('indexPage', function (page) {
        MyApp.service.DataService.getAllIdioms().done(function (r) {
            var selected = r[Math.floor((Math.random() * r.length))];
            $$(page.container).find('#idiomOfTheDay').html(selected['field_text']);
            $$(page.container).find('#idiomOfTheDayLink').attr('href', 'pages/DetailPage.tpl.html?id=' + selected['_id']);

        });
        console.log('ready');
    });
    //set statusbar color
    document.addEventListener('deviceready', function () {
        if (cordova.platformId == 'android') {
            StatusBar.backgroundColorByHexString("#2196F3");
        }
    });


    MyApp.mainView = MyApp.fw7App.addView('.view-main');
    MyApp.ns('MyApp.constant');
    MyApp.ns('MyApp.global');
    MyApp.constant.SERVER_API_URL = "data/api/";
    MyApp.constant.SERVER_AUDIO_URL = "audio/";

    window.setTimeout(function () {
        Dom7('.overlay.splashscreen').remove();
    }, 1000);



} ());