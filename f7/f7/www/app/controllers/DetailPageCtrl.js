(function ($$) {
    "use strict";
    MyApp.fw7App.onPageInit('detailPage', function (page) {
        
        
        /** $$tagClicked = function (tagName) {
             $rootScope.$emit("switchToTag", {'tag': tagName});
             $rootScope.$emit("toggleSidebar", {'state': true});
         };*/
        /**
                $scope.playButtonClicked = function (filename) {
                    var uri = SERVER_AUDIO_URL + filename.replace('.wma', '.mp3'),
                        sound = new Howl({
                            urls: [uri]
                        }).play();
                };*/
        //loadIdiom
        var dataService =  MyApp.service.DataService,
            kageService =  MyApp.service.KageService;
        MyApp.ns('MyApp.cache.compliedTemplate');
        MyApp.cache.compliedTemplate['contentTemplate'] = MyApp.cache.compliedTemplate['contentTemplate'] ||  Template7.compile($$('script#contentTemplate').html());
        
        console.log(page.query);

        var queryText = page.query.text;
        
        dataService.getIdiomByText(queryText).then(function (r) {
            var context = {};
            context.result = r;
            context.hasAnnotation = (r.field_annotations && r.field_annotations.length>0);
            console.log(r);
            //Seperate IDS
            var glyphs = DictUtils.getChars(r['field_text']);
            context.GlyphList = [];
            for (i = 0; i < glyphs.length; ++i) {
                context.GlyphList[i] = {};
                context.GlyphList[i]['text'] = glyphs[i];
            }
            //Add kanjiVG image to GlyphList
            for (var i = 0; i < glyphs.length; ++i) {
                if ((glyphs[i][0] == '{' && glyphs[i][glyphs[i].length - 1] == "}")
                    || DictUtils.extendedGlyphs.indexOf(glyphs[i]) != -1) {
                    kageService.getGlyphImage(glyphs[i], 200, i).then(function (r) {
                        console.log(r.id);
                        context.GlyphList[r.id]['imgsrc'] = r.data;
                    })
                }
            }
            console.log(context);
            
            //Render template
            var renderer = MyApp.cache.compliedTemplate['contentTemplate'];
            var renderedHtml = renderer(context);
            $$(page.container).find(".page-content").html(renderedHtml);

        }, function () {
            console.log('detailsCtrl: view change failed.');
        });
        
        
        $$(page.container).find('.shareButton').on('click', function() {
            document.addEventListener('deviceready', function() {
                setTimeout(function(){
                    plugins.socialsharing.share('Message only');
                });
                
            });
            console.log('share');
        })
        

    });
        
                            
    function switchToIdiom(text) {
        if (text) {
            MyApp.fw7.app.showIndicator();

        }
        var highOn = function (annoId) {
            var indices = $scope.result['field_annotations'][annoId]['indices'];
            var i;
            for (i = 0; i < indices.length; ++i) {
                $scope.highlight[indices[i]] = true;
            }
            $scope.highlightAnno[annoId] = true;
        };

        var highOff = function (annoId) {
            var indices = $scope.result['field_annotations'][annoId]['indices'];
            var i;
            for (i = 0; i < indices.length; ++i) {
                $scope.highlight[indices[i]] = false;
            }
            $scope.highlightAnno[annoId] = false;
        };
    };


} (Dom7));
