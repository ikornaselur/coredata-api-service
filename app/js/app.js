'use strict';


angular.module('coredata.api.service', [])
    .constant('endpoint', 'http://localhost:8100/api/v2');

require('./services/comments.js');
