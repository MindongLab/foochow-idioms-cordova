(function () {
    "use strict";
    MyApp.angular.controller('DetailPageCtrl', ['$q', '$scope', '$rootScope', 'DataService', 'KageService', 'SERVER_AUDIO_URL',  function ($q, $scope, $rootScope, dataService, kageService, SERVER_AUDIO_URL) {
        
        $scope.highlight = [];
        $scope.highlightAnno = [];
        

        $scope.tagClicked = function (tagName) {
            $rootScope.$emit("switchToTag", {'tag': tagName});
            $rootScope.$emit("toggleSidebar", {'state': true});
        };

        $scope.playButtonClicked = function (filename) {
            var uri = SERVER_AUDIO_URL + filename.replace('.wma', '.mp3'),
                sound = new Howl({
                    urls: [uri]
                }).play();
        };
        //loadIdiom
        function switchToIdiom (text) {
            if (text) {
                MyApp.fw7.app.showIndicator();
                dataService.getIdiomByText(text).then(function (r) {
                    $scope.result = r;
                    console.log($scope.result);
                    var glyphs = DictUtils.getChars(r['field_text']); 
                    var i;
                    var list= [];
                    for (i=0; i<glyphs.length; ++i) {
                        list[i]={};
                        list[i]['text']=glyphs[i];
                    }
                    $scope.field_text = list;
                    for (i=0; i<glyphs.length; ++i) {
                        if ((glyphs[i][0]=='{' && glyphs[i][glyphs[i].length-1]=="}")
                            || DictUtils.extendedGlyphs.indexOf(glyphs[i]) != -1) {
                            kageService.getGlypeImage(glyphs[i],200,i).then(function (r) {
                                console.log(r.id);
                                $scope.field_text[r.id]['imgsrc'] = r.data;
                            })
                        }
                    }
                    MyApp.fw7.app.hideIndicator();
                    
                }).catch(function () {
                    console.log('detailsCtrl: view change failed.');
                    MyApp.fw7.app.hideIndicator();
                });
            }
        };
        
        $scope.highOn = function (annoId) {
            var indices = $scope.result['field_annotations'][annoId]['indices'];
            var i;
            for (i=0; i<indices.length; ++i) {
                $scope.highlight[indices[i]]=true;
            }
            $scope.highlightAnno[annoId]=true;
        };
        
        $scope.highOff = function (annoId) {
            var indices = $scope.result['field_annotations'][annoId]['indices'];
            var i;
            for (i=0; i<indices.length; ++i) {
                $scope.highlight[indices[i]]=false;
            }
            $scope.highlightAnno[annoId]=false;
        };
        
        //Listener for SwitchToIdiom Event
        var unbind = $rootScope.$on('SwitchToIdiom', function(e,args) {
            switchToIdiom(args.text);
        });
        $scope.$on('$destroy', unbind);

    }]);
}());
