# hapi-mongoose
[![Circle CI](https://img.shields.io/circleci/project/asilluron/hapi-mongoose/master.svg?style=flat-square)](https://circleci.com/gh/asilluron/hapi-mongoose/tree/master)

Hapi Plugin to handle Mongoose handshake and initial setup

## Usage
```
var options = {
    async: false,
    uri: 'mongodb://localhost:27017'
};

var server = new Hapi.Server();

server.register({
    register: require('hapi-mongoose'),
    options: options
}, function (err) { });

var dbConn = server.methods.mongoose();
```
## Options
* bluebird - setting this option to true will use bluebird promises in place of mongoose's built in 'mpromise'. [Read More](http://mongoosejs.com/docs/promises.html)
* uri
[MongoDB uri](https://docs.mongodb.org/v3.0/reference/connection-string/)
