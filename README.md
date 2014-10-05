[![Build Status](https://travis-ci.org/Ikornaselur/coredata-api-service.svg?branch=master)](https://travis-ci.org/Ikornaselur/coredata-api-service)

# CoreData API service for AngularJS

An AngularJS service for the CoreData API

## Dependencies
The service uses npm to install dependencies for tests and to run them.

To install dependencies simply run the following command in the root of the project

```
npm install
```

## Gulp tasks

#### Lint
Runs JSHint on the project
```
gulp lint
```

#### Run tests
Runs the karma unit tests 
```
gulp test
```

#### Package into a single file
Packages the service into a single file at `./dist/coredata-api-service.js`
```
gulp dist
```

#### Gulp Watch to test, lint and package on each change
Runs all the tasks mentioned above on each file change
```
gulp watch
```

#### Default task
Runs `test`, `lint` and `dist` once
```
gulp
```