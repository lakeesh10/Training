//http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource
//http://country.io/data/

var app = angular.module('my-app', [], function () {})

app.controller('MainController', ['users', function (users) {
    var vm = this;
    users.get(function (data) {
        vm.users = data;
        window.names1.push(data);
    });
    vm.title = 'Hello World';
}]);
window.names1=[];

app.factory('users', ['$http', function ($http) {
    return {
        get: function (callback) {
            $http.get('http://country.io/names.json').success(function (data) {
                callback( data);
            })
        }
    }
}]);