# hapi-mongoose
[![Circle CI](https://img.shields.io/circleci/project/asilluron/hapi-mongoose/master.svg?style=flat-square)](https://circleci.com/gh/asilluron/hapi-mongoose/tree/master)

[![Stories in Ready](https://badge.waffle.io/asilluron/hapi-mongoose.svg?label=ready&title=Ready&style=flat-square)](http://waffle.io/asilluron/hapi-mongoose)

Hapi Plugin to handle Mongoose handshake and initial setup
## Install
```
npm install --save hapi-mongoose
```
## Requirements
* Mongoose
```
npm install --save mongoose
```

## Usage
```
var options = {
    promises: 'native',
    uri: 'mongodb://localhost:27017'
};

var server = new Hapi.Server();

server.register({
    register: require('hapi-mongoose'),
    options: options
}, function (err) { });

var db = server.plugins['hapi-mongoose'].connection;

var mongoose = server.plugins['hapi-mongoose'].lib;
```

### Example
```
var db = server.plugins['hapi-mongoose'].connection; // Get the current connection for this server instance
var mongoose = server.plugins['hapi-mongoose'].lib;
var Schema = mongoose.Schema;

var tankSchema = new Schema({
  //tank props
});

var Tank = db.model('Tank', tankSchema);

var small = new Tank({ size: 'small' });

small.save(function (err) {
  if (err) return handleError(err);
  // saved!
})

```



It is important to use ```server.plugins['hapi-mongoose'].lib``` instead of ```require('mongoose')``` due to [this issue](https://github.com/Automattic/mongoose/issues/2669).

## Options
* promises - Choose your promises implementation. Valid string options are 'bluebird', 'native' (or 'es6'). Any other value will result in the use of mongoose's built in 'mpromise'. [Read More](http://mongoosejs.com/docs/promises.html)
* uri - Your mongo uris [Read More](http://mongoosejs.com/docs/connections.html)
* mongooseOptions - A javascript opbject with mongoose connection options [Read More](http://mongoosejs.com/docs/connections.html#options)
[MongoDB uri](https://docs.mongodb.org/v3.0/reference/connection-string/)
