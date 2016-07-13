//http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource
//http://country.io/data/

function getKey(objectArray,value){
  //console.log(object)
  
  for (var j = 0; j < objectArray.length; j++){
    //console.log(objectArray[j].names);
    if(objectArray[j].names == value){
      return objectArray[j].key;
    }
  }
  return null;
};
function findObject(objectArray,value){
  for (var j = 0; j < objectArray.length; j++){
    console.log(objectArray[j].names);
    if(objectArray[j].names == value){
      return objectArray[j];
    }
  }
  return null;

}
function changeData(value,id){
  console.log(value);
  document.getElementById(id).innerHTML=value;
}
var countryObject = function(key,names,iso,capital,phone,currency){
  this.key=key;
  this.names=names;
  this.iso=iso;
  this.capital=capital;
  this.phone=phone;
  this.currency=currency;
}
var app = angular.module('my-app', ['ngRoute'])
window.names1=[];
window.country={};
window.country1=[];
window.click1=[];

app.config(['$routeProvider',
        function($routeProvider) {
          console.log("hello")
            $routeProvider.
                    when('/country/:param', {
                        template: " Country Name : {{data1.names}} <br> ISO :{{data1.iso}} <br>Capital :  {{data1.capital}} <br>Phone : {{data1.phone}} <br>Currency : {{data1.currency}}",
                        controller: 'RouteController'
                    });
}]);

app.controller('MainController', function($scope, $http) {
    $scope.keyValue="India";
    $http.get("http://country.io/names.json").success(function(response) {$scope.names = response; window.names1.push(response); window.country=response; console.log("Names");
      $http.get("http://country.io/iso3.json").success(function(response) {$scope.iso= response; window.names1.push(response); console.log("iso");
        $http.get("http://country.io/capital.json").success(function(response) {$scope.capital = response; window.names1.push(response); console.log("Capital");
          $http.get("http://country.io/phone.json").success(function(response) {$scope.phone = response; window.names1.push(response); console.log("phone");
           $http.get("http://country.io/currency.json").success(function(response) {$scope.currency = response; window.names1.push(response)
              $scope.countryData=[];
              for(var key in country)
              {
                   //console.log(key);
                  var object= new countryObject(key,$scope.names[key],$scope.iso[key],$scope.capital[key],$scope.phone[key],$scope.currency[key]);
                  window.country1.push(object);
                  $scope.countryData.push(object);
              }
              console.log("currency")
            });
          });
        });
      });
    });  
   $scope.changeData = function(value,id){
    //console.log(value);
    $scope.keyValue=value;
   }
    
    console.log(window.country1);

        $scope.key="AD";
     $scope.$watch("keyValue", function(newValue, oldValue) {
       $scope.key = getKey(window.country1,newValue);
     //console.log($scope.key);
   });
    
    
});
app.controller("RouteController", function($scope, $routeParams,$http) {
  $scope.keyValue="India";
    $http.get("http://country.io/names.json").success(function(response) {
      $http.get("http://country.io/iso3.json").success(function(response) {
        $http.get("http://country.io/capital.json").success(function(response) {
          $http.get("http://country.io/phone.json").success(function(response) {
           $http.get("http://country.io/currency.json").success(function(response) {
              console.log($routeParams.param);
              $scope.message=$routeParams.param;
              var object=findObject(country1,$routeParams.param);
              $scope.data1=object;
              window.click1.push($routeParams)

              
            });
          });
        });
      });
    }); 
        
    })

