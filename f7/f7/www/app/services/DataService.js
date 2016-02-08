(function ($) {
    "use strict";
    var SERVER_API_URL = MyApp.constant.SERVER_API_URL;
    MyApp.ns('MyApp.service.DataService');
    MyApp.service.DataService.getAllIdioms = function () {
        return $.getJSON(SERVER_API_URL + '/all/').then(function (data) {
            return data;
        }, function () {
            return 'e';
        });
    };

    MyApp.service.DataService.getIdiomsByTag = function (tagName) {
        return $.getJSON(SERVER_API_URL + '/tag/' + tagName).then(function (data) {
            return data;
        }, function () {
            return 'e';
        });
    };

    MyApp.service.DataService.getGlyph = function (ids) {
        return $.getJSON(SERVER_API_URL + '/glyph/' + ids).then(function (data) {
            return data;
        }, function () {
            return 'e';
        });
    };

    MyApp.service.DataService.getIdiomByText = function (text) {
        return $.getJSON(SERVER_API_URL + '/sentence/' + text).then(function (data) {
            return data;
        }, function () {
            return $q.reject('e');
        });
    };


} (jQuery));