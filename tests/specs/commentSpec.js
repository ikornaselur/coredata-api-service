'use strict';

describe('API - Comments', function () {
    var coredataApi, httpBackend;

    beforeEach(module('coredata.api.service'));

    beforeEach(inject(function (_coredataApi_, $httpBackend) {
        coredataApi = _coredataApi_;
        httpBackend = $httpBackend;
    }));
    it('should return a list of comments from comments()', function () {
        var comments = coredataApi.comments();
        expect(comments).toEqual([{'id': 1, 'text': 'Yolo swagger'}]);
    });
});
