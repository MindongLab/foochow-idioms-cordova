(function ($$) {
    "use strict";


    MyApp.fw7App.onPageInit('tagsPage', function (page) {
        //TODO bind events
        //$$().on('',function(e){})
        
        
        // Generate array with 10000 demo items:
       
        MyApp.service.DataService.getAllTags().done(function (data) {
            var items = [];
            for (var i=0; i< data.length; i++) {
                items.push({title:data[i]});
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
                '<a href="pages/ListPage.tpl.html?tag={{title}}" class="item-link item-content">' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">{{title}}</div>' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</li>',
                // Item height
                height: 55,
            });
        })


    });



} (Dom7));