'use strict';

describe('API - Comments', function () {
  var Comments, httpBackend, testEndpoint;
  var mockList = [
    {
      'author': '/api/v2/users/Administrator',
      'doc_id': '83d569d6-4027-11e4-b864-0021ccc2cbcb',
      'id': 1,
      'resource_uri': 'api/v2/comments/1/',
      'text': 'foo',
      'time': '2014-09-19T18:05:37:234123'
    },
    {
      'author': '/api/v2/users/Administrator',
      'doc_id': '888b4dba-4027-11e4-a3fa-0021ccc2cbcb',
      'id': 2,
      'resource_uri': 'api/v2/comments/2/',
      'text': 'bar',
      'time': '2014-09-19T18:05:39:518243'
    }
  ];
  var defaultMeta = {
    'limit': 20,
    'next': null,
    'offset': 0,
    'previous': null,
    'total_count': 0
  };

  beforeEach(module('coredata.api'));

  beforeEach(inject(function (_Comments_, _endpoint_, $httpBackend) {
    Comments = _Comments_;
    httpBackend = $httpBackend;
    testEndpoint = _endpoint_;
  }));

  describe('/comments [GET]', function () {
    var res;
    beforeEach(function () {
      res = {
        'meta': defaultMeta,
        'objects': mockList
      };
    });
    describe('no filters', function () {
      beforeEach(function () {
        /* jshint camelcase: false */
        res.meta.total_count = 2;
      });

      it('should call the API correctly', function () {
        httpBackend.expectGET(testEndpoint + '/comments').respond(res);
        Comments.getComments();
        httpBackend.flush();
      });

      it('should return a list of comments', function () {
        httpBackend.expectGET(testEndpoint + '/comments').respond(res);

        Comments.getComments().then(function (comments) {
          expect(comments).toEqual(mockList);
        });
        httpBackend.flush();
      });

      it('should reject the promise if the API call fails', function () {
        var errorCode = 404;
        var errorMsg = 'test error';
        httpBackend.expectGET(testEndpoint + '/comments').respond(errorCode, errorMsg);

        var successSpy = jasmine.createSpy('success');
        var failSpy = jasmine.createSpy('fail');

        Comments.getComments().then(successSpy, failSpy);
        httpBackend.flush();

        expect(successSpy).not.toHaveBeenCalled();
        expect(failSpy).toHaveBeenCalledWith(errorCode + ': ' + errorMsg);
      });
    });

    describe('with a filter', function () {
      it('should call the API correctly with one filter', function () {
        var limit = 1;
        /* jshint camelcase: false */
        res.meta.total_count = limit;
        httpBackend.expectGET(testEndpoint + '/comments?limit=' + limit).respond(res);
        Comments.getComments({'limit': limit});
        httpBackend.flush();
      });
      it('should call the API correctly with more than one filter', function () {
        var limit = 1;
        var offset = 0;
        /* jshint camelcase: false */
        res.meta.total_count = limit;
        httpBackend.expectGET(testEndpoint + '/comments?limit=' + limit + '&offset=' + offset).respond(res);
        Comments.getComments({'limit': limit, 'offset': offset});
        httpBackend.flush();
      });
    });
  });

  describe('/comments [POST]', function () {
    it('should post to the API correctly', function () {
      var commentText = 'test comment';
      var docId = '888b4dba-4027-11e4-a3fa-0021ccc2cbcb';
      httpBackend.expectPOST(testEndpoint + '/comments', {
        'text': commentText,
        'doc_id': docId
      }).respond(201);
      Comments.addComment(commentText, docId);
      httpBackend.flush();
    });

    it('should get call the return a promise and .success() if the API returns success', function () {
      var comment = 'test comment';
      var docId = '888b4dba-4027-11e4-a3fa-0021ccc2cbcb';
      httpBackend.expectPOST(testEndpoint + '/comments', {
        'text': comment,
        'doc_id': docId
      }).respond(201);

      var successSpy = jasmine.createSpy('success');
      var failSpy = jasmine.createSpy('fail');

      Comments.addComment(comment, docId).then(successSpy, failSpy);
      httpBackend.flush();

      expect(successSpy).toHaveBeenCalled();
      expect(failSpy).not.toHaveBeenCalled();
    });

    it('should get call the return a promise and .fail() if the API return fail', function () {
      var errorCode = 500;
      var errorMsg = 'test error';
      var comment = 'test comment';
      var docId = '888b4dba-4027-11e4-a3fa-0021ccc2cbcb';
      httpBackend.expectPOST(testEndpoint + '/comments', {
        'text': comment,
        'doc_id': docId
      }).respond(errorCode, errorMsg);

      var successSpy = jasmine.createSpy('success');
      var failSpy = jasmine.createSpy('fail');

      Comments.addComment(comment, docId).then(successSpy, failSpy);
      httpBackend.flush();

      expect(successSpy).not.toHaveBeenCalled();
      expect(failSpy).toHaveBeenCalledWith(errorCode + ': ' + errorMsg);
    });
  });

  describe('/comments/{id} [GET]', function () {
    it('should call the API correctly', function () {
      var commentId = 1;
      httpBackend.expectGET(testEndpoint + '/comments/' + commentId).respond(200);
      Comments.getComment(commentId);
      httpBackend.flush();
    });

    it('should return a single comment if it exists', function () {
      var commentId = 1;
      httpBackend.expectGET(testEndpoint + '/comments/' + commentId).respond(mockList[0]);

      var failSpy = jasmine.createSpy('fail');
      Comments.getComment(commentId).then(function (comment) {
        expect(comment).toEqual(mockList[0]);
      }, failSpy);

      httpBackend.flush();

      expect(failSpy).not.toHaveBeenCalled();
    });

    it('should fail a promise if the comment does not exist', function () {
      var errorCode = 404;
      var errorMsg = 'test error';
      var commentId = 0;
      httpBackend.expectGET(testEndpoint + '/comments/' + commentId).respond(errorCode, errorMsg);
      var successSpy = jasmine.createSpy('success');
      var failSpy = jasmine.createSpy('fail');

      Comments.getComment(commentId).then(successSpy, failSpy);
      httpBackend.flush();

      expect(successSpy).not.toHaveBeenCalled();
      expect(failSpy).toHaveBeenCalledWith(errorCode + ': ' + errorMsg);
    });
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
