(function () {
    "use strict";
    MyApp.angular.controller('IndexPageCtrl', ['$scope', '$rootScope', "KageService", "InitService", function ($scope, $rootScope, kageService, initService) {
        $scope.featureClicked = function (id) {
            switch (id) {
                case 1:  //List All
                    //show sideBar
                    $rootScope.$emit("toggleSidebar", { 'state': true });
                    //remove tag filter
                    $rootScope.$emit("switchToTag", { 'tag': "" });
                    break;
                case 2:
                    break;
                case 3:
                    $location.path('/help');
                    $rootScope.$emit("toggleSidebar", { 'state': false });
                    break;
            }
        };

        $scope.draw = function () {
            var can = document.createElement('canvas');
            can.height = 300;
            can.width = 300;
            kageService.getKage("𣍐", can).then(function () {
                console.log(can.toDataURL());
            });

        }
        $scope.title="hihihi";
        console.log('IndexPageCtrl');

    }]);
}());
