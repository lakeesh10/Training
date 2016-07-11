//http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource
//http://country.io/data/

Object.prototype.getKey = function(value){
  for(var key in this){
    if(this[key] == value){
      return key;
    }
  }
  return null;
};
var app = angular.module('my-app', [], function () {})
window.names1=[];
window.country={};
app.controller('MainController', function($scope, $http) {
  $scope.keyValue="India";
    $http.get("http://country.io/names.json").success(function(response) {
        $scope.names = response; 
        window.names1.push(response);
        window.country=response;
        
  
        
    });
     
    $http.get("http://country.io/iso3.json").success(function(response) {$scope.iso= response; window.names1.push(response)});
    $http.get("http://country.io/capital.json").success(function(response) {$scope.capital = response; window.names1.push(response)});
    $http.get("http://country.io/phone.json").success(function(response) {$scope.phone = response; window.names1.push(response)});
    $http.get("http://country.io/currency.json").success(function(response) {$scope.currency = response; window.names1.push(response)});
    
     $scope.$watch("keyValue", function(newValue, oldValue) {
       $scope.key = country.getKey(newValue);
     console.log($scope.key);
   });
    
    
});

