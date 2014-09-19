angular.module('coredata.api.service')
.service('coredataApi', ['endpoint', '$http', '$q', function (endpoint, $http, $q) {
    return {
        comments: function comments(filters) {
            var filter = "?";
            if (typeof filters !== 'undefined') {
                for (f in filters) {
                    filter += f + "=" + filters[f] + "&";
                }
            }
            filter = filter.substring(0, filter.length - 1);

            var defer = $q.defer();
            $http.get(endpoint + '/comments' + filter)
                .success(function success(data) {
                    defer.resolve(data['objects']);
                })
                .error(function error(msg, status) {
                    defer.reject(status + ': ' + msg);
                });
            return defer.promise;
        },
        addComment: function addComment(data) {
            var defer = $q.defer();
            $http.post(endpoint + '/comments')
                .success(function (data, status) {
                    defer.resolve(status);
                })
                .error(function (msg, status) {
                    defer.reject(status + ': ' + msg);
                });
            return defer.promise;
        },
        getComment: function getComment(id) {
            var defer = $q.defer();
            $http.get(endpoint + '/comments/' + id)
                .success(function (data, status) {
                    defer.resolve(data);
                })
                .error(function (msg, status) {
                    defer.reject(status + ': ' + msg);
                });
            return defer.promise;
        }
    }
}]);
