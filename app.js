var Hapi = require('hapi');
var Settings = require('./server/config/settings');
var Plugins = require('./server/config/plugins');
var Database = require('./server/config/database');
var Vendor = require('./server/vendor/controller');

//Create new server
var server = new Hapi.Server();

//Register a connection
server.connection({host : Settings.host, port : Settings.port});

//Register Hapi Server Plugins
server.register([
    {
        register : Plugins
    },
    {
        register : Database
    },
    {
        register : Vendor
    }
], function(err) {
    if(err) {
        console.error('Failed to load a plugin:', err);
        throw err;
    }
});

//Export the server to be required elsewhere.
module.exports = server;

//Add routes
//Test route. All routes will be added by plugins
server.route({
    path: '/index',
    method: 'GET',
    config: {
        handler: function(req, res) {
            req.log();
            res('Hello');
        },
        auth: false,
        description: 'Welcome app',
        notes: 'Send a static welcome message to vendor',
        tags: ['api']
    }
});

//Start the server
server.start(function() {
    console.log('Server started at: ' + server.info.uri);
});