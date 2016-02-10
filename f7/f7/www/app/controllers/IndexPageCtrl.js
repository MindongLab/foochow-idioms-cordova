(function ($$, $) {
    "use strict";
    MyApp.fw7App.onPageInit('indexPage', function (page) {

    });
    
    //Attach event handlers to popover menu
    $(document).ready(function () {
        $$('.shareButton').on('click', function () {
            document.addEventListener('deviceready', function () {
                setTimeout(function () {
                    if (MyApp.global.currentIdiom && MyApp.global.currentIdiom.text) {
                        plugins.socialsharing.share(MyApp.global.currentIdiom.text);
                    }

                }, 100);

            });
            console.log('share');
            console.log(MyApp.global.currentIdiom);
        });
        
        $$('.favoriteButton').on('click', function () {
            //TODO MyApp.service.FavoriteService
            console.log('favorite');
            console.log(MyApp.global.currentIdiom);
        });
        
        $$('.saveButton').on('click', function () {
            //TODO Save image and audio
            console.log('save');
            console.log(MyApp.global.currentIdiom);
        });
        
        $$('.feedbackButton').on('click', function () {
            //TODO 
            console.log('feedback');
            console.log(MyApp.global.currentIdiom);
        });
        
        $$('.recordButton').on('click', function () {
            //TODO 
            console.log('record');
            console.log(MyApp.global.currentIdiom);
        });
    });

} (Dom7, jQuery));
