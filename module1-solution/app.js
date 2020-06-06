(function(){
    'use strict';
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', funLunchCheckController);

    funLunchCheckController.$inject = ['$scope'];

    function funLunchCheckController($scope) {
        $scope.color = "green";
        $scope.status = "";
        $scope.lunchMenu = "";
        $scope.checkIfTooMuch = function () {
            $scope.status = "";
            if($scope.lunchMenu == "") {
                $scope.status = "Please enter data first";
                $scope.color = "red"
            }
            else {
                var length = $scope.lunchMenu.split(",").length;
                if(length > 3) {
                    $scope.status = "Too much!";
                }
                else {
                    $scope.status ="Enjoy!";
                }
                $scope.color = "green";
            }
            $scope.lunchMenu = "";
        }
    }
})();