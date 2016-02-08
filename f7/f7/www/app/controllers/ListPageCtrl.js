(function ($$) {
    "use strict";


    function switchToTag(tag) {
        if (tag && tag != '') {
            $scope.loading = true;
            dataService.getIdiomsByTag(tag).then(function (r) {
                $scope.list = r;
                $scope.tagName = tag;
                $scope.loading = false;
            });
        } else {
            $scope.tagName = "";
            loadAll();
        }

    }

    function loadAll() {
        MyApp.fw7.app.showIndicator();
        dataService.getAllIdioms().then(function (r) {
            $scope.list = r;

            MyApp.fw7.app.hideIndicator();
        }, function () {
            MyApp.fw7.app.hideIndicator();
        });
    }


    MyApp.fw7App.onPageInit('listPage', function (page) {
        //TODO bind events
        //$$().on('',function(e){})
        
        
        // Generate array with 10000 demo items:
       
        MyApp.service.DataService.getAllIdioms().done(function (data) {
            var items = [];
            for (var i=0; i< data.length; i++) {
                items.push({title:data[i], subtitle:'#'+i});
            }
            // Create virtual list
            var virtualList = MyApp.fw7App.virtualList($$(page.container).find('.virtual-list'), {
                // Pass array with items
                items: items,
                // Custom search function for searchbar
                searchAll: function (query, items) {
                    var found = [];
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].title.indexOf(query) >= 0 || query.trim() === '') found.push(i);
                    }
                    return found; //return array with mathced indexes
                },
                // List item Template7 template
                template: '<li>' +
                '<a href="/pages/DetailPage.tpl.html?text={{title}}" class="item-link item-content">' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">{{title}}</div>' +
                '</div>' +
                '<div class="item-subtitle">{{subtitle}}</div>' +
                '</div>' +
                '</a>' +
                '</li>',
                // Item height
                height: 73,
            });
        })


    });



} (Dom7));