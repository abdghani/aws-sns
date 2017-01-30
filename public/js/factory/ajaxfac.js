
angular.module('myapp').factory('ajaxFac', function ($http) {
    
    return {
        httpPost: function (url, param, callback) {
            $http
                .post(url, param)
                .then(function (res) {
                    console.log(res);
                if(callback)
                    callback(res.data);
                })
                .catch(function (error) {
                    callback(error.data);
                });
        },
        httpGet: function (url, callback) {
            $http
                .get(url)
                .then(function (res) { callback(res.data); })
                .catch(function (error) {
                    callback(error.data);
                });
        }
    };
});