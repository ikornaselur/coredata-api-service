'use strict';

angular.module('coredata.api')
  .service('Docs', ['endpoint', '$http', '$q', function (endpoint, $http, $q) {
    return {
      getDocs: function getDocs(filters) {
        var filter = '?';
        if (typeof filters !== 'undefined') {
          for (var f in filters) {
            if (filters.hasOwnProperty(f)) {
              filter += f + '=' + filters[f] + '&';
            }
          }
        }
        filter = filter.substring(0, filter.length - 1);

        var defer = $q.defer();
        $http.get(endpoint + '/docs' + filter)
          .success(function success(data) {
            defer.resolve(data.objects);
          })
          .error(function error(msg, status) {
            defer.reject(status + ': ' + msg);
          });
        return defer.promise;
      },
      getDoc: function getDoc(id) {
        var defer = $q.defer();
        $http.get(endpoint + '/docs/' + id)
          .success(function success(data) {
            defer.resolve(data);
          })
          .error(function error(msg, status) {
            defer.reject(status + ': ' + msg);
          });
        return defer.promise;
      },
      deleteDoc: function deleteDoc(id) {

      }
    };
  }]);