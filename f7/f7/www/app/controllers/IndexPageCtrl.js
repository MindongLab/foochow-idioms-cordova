(function ($$, $) {
    "use strict";

    
    //Attach event handlers to popover menu
    $(document).ready(function () {
        $$('.shareButton').on('click', function () {
            MyApp.ns('MyApp.cache.compliedTemplate');
            MyApp.cache.compliedTemplate['shareTemplate'] = MyApp.cache.compliedTemplate['shareTemplate'] || Template7.compile($$('#sharePopup').html());
            var renderer = MyApp.cache.compliedTemplate['shareTemplate'];

            MyApp.service.PicService.draw(MyApp.global.currentIdiom.data).then(function (pic) {
                var html = renderer({ 'data': pic, 'text': MyApp.global.currentIdiom.data.field_text});
                MyApp.mainView.router.loadContent(html);

            })

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

    MyApp.ns('MyApp.global');
    MyApp.global.share = function () {
        var pic = $$('#picShare').attr('src');
        var message = '福州话熟语大全 - '+$$('#picShare').data('text');
        document.addEventListener('deviceready', function () {
            setTimeout(function () {
                if (MyApp.global.currentIdiom && MyApp.global.currentIdiom.text) {
                    plugins.socialsharing.share(message, null, pic,null);
                }

            }, 1000);

        });
        console.log(pic,message);
    }

    MyApp.fw7App.onPageInit('sharepage', function (page) {
        $$(page.container).find('#shareNowButton').on('click', MyApp.global.share);
    });

    

} (Dom7, jQuery));
