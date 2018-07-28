# hapi-mongoose

[![Circle CI](https://img.shields.io/circleci/project/asilluron/hapi-mongoose/master.svg?style=flat-square)](https://circleci.com/gh/asilluron/hapi-mongoose/tree/master)

[![Stories in Ready](https://badge.waffle.io/asilluron/hapi-mongoose.svg?label=ready&title=Ready&style=flat-square)](http://waffle.io/asilluron/hapi-mongoose)

An hapi plugin to handle Mongoose handshake and initial setup.

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

```javascript
const options = {
    promises: 'native',
    uri: 'mongodb://localhost:27017'
};

const server = new Hapi.Server();

await server.register({
    plugin: require('hapi-mongoose'),
    options: options
});

const db = server.plugins['hapi-mongoose'].connection;

const mongoose = server.plugins['hapi-mongoose'].lib;
```

### Example

```javascript
const db = server.plugins['hapi-mongoose'].connection; // Get the current connection for this server instance
const mongoose = server.plugins['hapi-mongoose'].lib;
const Schema = mongoose.Schema;

const tankSchema = new Schema({
  // Tank properties
});

const Tank = db.model('Tank', tankSchema);

const small = new Tank({ size: 'small' });

small.save(function (err) {
  if (err) return handleError(err);
  // Saved!
});
```

It is important to use ```server.plugins['hapi-mongoose'].lib``` instead of ```require('mongoose')``` due to [this issue](https://github.com/Automattic/mongoose/issues/2669).

## Options

* `promises` - Choose your promises implementation. Valid string options are `bluebird`, `native` (or `es6`). Any other value will result in the use of Mongoose's built-in `mpromise` ([read more](http://mongoosejs.com/docs/promises.html)).
* `uri` - A [MongoDB connection string](https://docs.mongodb.org/v4.0/reference/connection-string/).
* `mongooseOptions` - A JavaScript object with [Mongoose connection options](http://mongoosejs.com/docs/connections.html#options).
