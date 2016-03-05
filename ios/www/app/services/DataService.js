(function ($) {
    "use strict";
    var SERVER_API_URL = MyApp.constant.SERVER_API_URL;
    MyApp.ns('MyApp.service.DataService');
    MyApp.service.DataService.getAllIdioms = function () {
        return $.getJSON(SERVER_API_URL + 'all.json').then(function (data) {
            return data;
        }, function () {
            return 'e';
        });
    };
    
    MyApp.service.DataService.getAllTags = function () {
        return $.getJSON(SERVER_API_URL + 'all_tags.json').then(function (data) {
            return data;
        }, function () {
            return 'e';
        });
    };

    MyApp.service.DataService.getIdiomsByTag = function (tagName) {
        return $.getJSON(SERVER_API_URL + 'tag_' + encodeURI(encodeURI(tagName)) + '.json').then(function (data) {
            return data;
        }, function () {
            return 'e';
        });
    };

    MyApp.service.DataService.getGlyph = function (ids) {
        return $.getJSON(SERVER_API_URL + 'glyph_' + encodeURI(encodeURI(ids))+'.json').then(function (data) {
            return data;
        }, function () {
            return 'e';
        });
    };

    MyApp.service.DataService.getIdiomById = function (id) {
        return $.getJSON(SERVER_API_URL + 's_' + id+'.json').then(function (data) {
            return data;
        }, function () {
            return $q.reject('e');
        });
    };


} (jQuery));