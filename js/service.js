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
                    defer.reject(msg);
                });
            return defer.promise;
        },
        addComment: function addComment(data) {

        },
        getComment: function getComment(id) {
            return {
                'id': 1,
                'test': 'Yolo swagger'
            }
        }
    }
}]);
