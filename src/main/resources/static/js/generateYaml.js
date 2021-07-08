angular.module('mvel-editor', []).controller(
    'generate',
    function($scope, $location, $http) {
        $scope.generateMvel = function() {
            var formData = $scope.mvel;
            var config = {
                transformRequest : angular.identity,
                transformResponse : angular.identity,
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            };
            var url = "v1/mvelgenerator/generate";
            $http.post(url, formData).then(
                function successCallback(response) {
                    console.log("success");
                }, function errorCallback(response) {
                    console.log("failure");
                });
        };
    });
