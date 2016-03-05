(function () {
    "use strict";
    MyApp.angular.controller('NavCtrl', ['$scope', '$rootScope', '$location', 'DataService', function ($scope, $rootScope, $location, dataService) {
        $scope.shareButtonClicked = function () {
            console.log('share');
            $rootScope.$emit('Share');
        }

    }]);
}());