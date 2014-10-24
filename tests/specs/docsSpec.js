'use strict';

describe('API - Docs', function () {
  var Docs, httpBackend, testEndpoint;
  var mockList = [
    {
      'created': '2014-10-24T09:37:43.957000+00:00',
      'created_by': '{\'username\': u\'FooBar\', \'first_name\': u\'Foo\', \'last_name\': u\'Bar\'}',
      'description': 'Description',
      'id': '67d0acf0-5b61-11e4-a5ed-0021ccc2cbcb',
      'modified': '2014-10-24T09:37:43.957000+00:00',
      'modified_by': '{\'username\': u\'FooBar\', \'first_name\': u\'Foo\', \'last_name\': u\'Bar\'}',
      'path': '/domain/spaces/system/global/Contacts/laika.kv.test/Foo Bar',
      'resource_uri': '/api/v2/docs/67d0acf0-5b61-11e4-a5ed-0021ccc2cbcb/',
      'title': 'Foo Bar',
      'type': 'Contact',
      'version': '0.1'
    },
    {
      'created': '2014-10-24T09:41:11.375000+00:00',
      'created_by': '{\'username\': u\'FooBar\', \'first_name\': u\'Foo\', \'last_name\': u\'Bar\'}',
      'description': 'We need more project managers.',
      'id': 'e372ecec-5b61-11e4-9034-0021ccc2cbcb',
      'modified': '2014-10-24T09:41:12.114000+00:00',
      'modified_by': '{\'username\': u\'FooBar\', \'first_name\': u\'Foo\', \'last_name\': u\'Bar\'}',
      'path': '/domain/spaces/Human Resources/Volunteers/Projects/Hiring/tasks/Hire project manager',
      'resource_uri': '/api/v2/docs/e372ecec-5b61-11e4-9034-0021ccc2cbcb/',
      'title': 'Hire project manager',
      'type': 'Task',
      'version': '0.2'
    }
  ];
  var defaultMeta = {
    'limit': 20,
    'next': '/api/v2/docs/?api_key=special-key&limit=20&offset=20',
    'offset': 0,
    'previous': null,
    'total_count': 40
  };

  beforeEach(module('coredata.api'));

  beforeEach(inject(function (_Docs_, _endpoint_, $httpBackend) {
    Docs = _Docs_;
    httpBackend = $httpBackend;
    testEndpoint = _endpoint_;
  }));

  describe('/docs [GET]', function () {
    var res;
    beforeEach(function () {
      res = {
        'meta': defaultMeta,
        'objects': mockList
      };
    });
    describe('no filter', function () {
      beforeEach(function () {
        /* jshint camelcase: false */
        res.meta.total_count = 2;
      });

      it('should call the API correctly', function () {
        httpBackend.expectGET(testEndpoint + '/docs').respond(res);
        Docs.getDocs();
        httpBackend.flush();
      });
      
      it('should return a list of docs', function () {
        httpBackend.expectGET(testEndpoint + '/docs').respond(res);

        Docs.getDocs().then(function (docs) {
          expect(docs).toEqual(mockList);
        });
        httpBackend.flush();
      });

      it('should reject the promise if the API call fails', function () {
        var errorCode = 404;
        var errorMsg = 'test error';
        httpBackend.expectGET(testEndpoint + '/docs').respond(errorCode, errorMsg);

        var successSpy = jasmine.createSpy('success');
        var failSpy = jasmine.createSpy('fail');

        Docs.getDocs().then(successSpy, failSpy);
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
        httpBackend.expectGET(testEndpoint + '/docs?limit=' + limit).respond(res);
        Docs.getDocs({'limit': limit});
        httpBackend.flush();
      });
      
      it('should call the API correctly with more than one filter', function () {
        var limit = 1;
        var offset = 0;
        /* jshint camelcase: false */
        res.meta.total_count = limit;
        httpBackend.expectGET(testEndpoint + '/docs?limit=' + limit + '&offset=' + offset).respond(res);
        Docs.getDocs({'limit': limit, 'offset': offset});
        httpBackend.flush();
      });
    });
  });

  describe('/docs/{id} [GET]', function () {
    it('should call the API correctly', function () {
      var docId = '67d0acf0-5b61-11e4-a5ed-0021ccc2cbcb';
      httpBackend.expectGET(testEndpoint + '/docs/' + docId).respond(200);
      Docs.getDoc(docId);
      httpBackend.flush();
    });

    it('should return a single doc if it exists', function () {
      var docId = '67d0acf0-5b61-11e4-a5ed-0021ccc2cbcb';
      httpBackend.expectGET(testEndpoint + '/docs/' + docId).respond(mockList[0]);

      var failSpy = jasmine.createSpy('fail');
      Docs.getDoc(docId).then(function (doc) {
        expect(doc).toEqual(mockList[0]);
      }, failSpy);

      httpBackend.flush();

      expect(failSpy).not.toHaveBeenCalled();
    });

    it('should fail a promise if the doc does not exist', function () {
      var errorCode = 404;
      var errorMsg = 'test error';
      var docId = '8jeala83-afei-sijf-3j9f-s94jfsli4fli';
      httpBackend.expectGET(testEndpoint + '/docs/' + docId).respond(errorCode, errorMsg);

      var successSpy = jasmine.createSpy('success');
      var failSpy = jasmine.createSpy('fail');

      Docs.getDoc(docId).then(successSpy, failSpy);
      httpBackend.flush();

      expect(successSpy).not.toHaveBeenCalled();
      expect(failSpy).toHaveBeenCalledWith(errorCode + ': ' + errorMsg);
    });
  });

  describe('/docs/{id} [DELETE]', function () {
    it('should call the API correctly', function () {
      var docId = '67d0acf0-5b61-11e4-a5ed-0021ccc2cbcb';
      httpBackend.expectDELETE(testEndpoint + '/docs/' + docId).respond(200);
      Docs.deleteDoc(docId);
      httpBackend.flush();
    });

    it('should fail a promise if unable to delete doc', function () {
      var errorCode = 404;
      var errorMsg = 'test error';
      var docId = '8jeala83-afei-sijf-3j9f-s94jfsli4fli';
      httpBackend.expectDELETE(testEndpoint + '/docs/' + docId).respond(errorCode, errorMsg);

      var successSpy = jasmine.createSpy('success');
      var failSpy = jasmine.createSpy('fail');

      Docs.deleteDoc(docId).then(successSpy, failSpy);
      httpBackend.flush();

      expect(successSpy).not.toHaveBeenCalled();
      expect(failSpy).toHaveBeenCalledWith(errorCode + ': ' + errorMsg);
    });
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
