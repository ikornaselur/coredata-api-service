'use strict';

angular.module('coredata.api', [])
  .constant('endpoint', 'http://localhost:8100/api/v2')
  .constant('auth', 'Basic ' + btoa('Administrator:Administrator'))
  .config(['$httpProvider', 'auth', function ($httpProvider, auth) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common.Authorization = auth;
    $httpProvider.defaults.headers.common.withCredentials = true;
  }]);

require('./services/comments.js');