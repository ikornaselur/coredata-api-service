'use strict';

angular.module('coredata.api.service')
  .service('Comments', ['endpoint', '$http', '$q', function (endpoint, $http, $q) {
    return {
      getComments: function getComments(filters) {
        var filter = '?';
        if (typeof filters !== 'undefined') {
          for (var f in filters) {
            filter += f + '=' + filters[f] + '&';
          }
        }
        filter = filter.substring(0, filter.length - 1);

        var defer = $q.defer();
        $http.get(endpoint + '/comments' + filter)
          .success(function success(data) {
            defer.resolve(data.objects);
          })
          .error(function error(msg, status) {
            defer.reject(status + ': ' + msg);
          });
        return defer.promise;
      },
      addComment: function addComment(comment, id) {
        var defer = $q.defer();
        $http.post(endpoint + '/comments', {'text': comment, 'doc_id': id})
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
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function (msg, status) {
            defer.reject(status + ': ' + msg);
          });
        return defer.promise;
      }
    };
  }]);

