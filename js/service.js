angular.module('coredata.api.service')
.service('coredataApi', ['$http', function ($http) {
    return {
        comments: function comments() {
            return [
                {
                    'id': 1,
                    'text': 'Yolo swagger'
                }
            ]
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
