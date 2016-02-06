(function () {
    "use strict";
    MyApp.angular.controller('ListPageCtrl', ['$scope', '$rootScope', '$location', 'DataService', function ($scope, $rootScope, $location, dataService) {
        $scope.loading=false;
        $scope.list = [];
        $scope.loaded = false;

        $scope.tagName = "";
        

        $scope.listItemClicked = function (text) {
            $rootScope.$emit("SwitchToIdiom", {'text': text});
            console.log(text);
        };
        
        
        function switchToTag(tag) {
            if (tag && tag!='') {
                $scope.loading = true;
                dataService.getIdiomsByTag(tag).then(function (r) {
                    $scope.list = r;
                    $scope.tagName =  tag;
                    $scope.loading= false;
                });
            } else {
                $scope.tagName="";
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
        
        loadAll();
        
        var unbind = $rootScope.$on("switchToTag", function (e, args) {
            if (args && args.tag) {
                switchToTag(args.tag);
            } else {
                switchToTag("");
            }
        });

        $scope.$on('$destroy', unbind);
        
        


    }]);
}());