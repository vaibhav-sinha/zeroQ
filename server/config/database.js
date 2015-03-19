var Mongoose = require('mongoose');
var Settings = require('./settings');

exports.register = function (server, options, next) {
    Mongoose.connect('mongodb://' + Settings.database.host + '/' + Settings.database.db);
    var db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function callback() {
        console.log("Connection with database succeeded.");
        server.app.db = db;
        server.app.mongoose = Mongoose;
    });
    next();
};

exports.register.attributes = {
    name: 'databasePlugin',
    version: '1.0.0'
};