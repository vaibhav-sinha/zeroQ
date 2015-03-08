//Good: Logging plugin
var Good = require('good');
//Lout: Documentation plugin. Adds endpoint /docs
var Lout = require('lout');
//Boom: HTTP response objects
var Boom = require('boom');

// Options to pass into the 'Good' plugin
var goodOptions = {
    opsInterval: 60000,
    reporters: [{
        reporter: require('good-console'),
        args:[{ ops: '*', request: '*', log: '*', response: '*', 'error': '*' }]
    }]
};

// Load multiple plugins
exports.register = function (server, options, next) {
    server.register([
        {
            register: Good,
            options: goodOptions
        },
        {
            register: Lout
        },
        {
            register: Boom
        }
    ], function (err) {
        if (err) {
            console.error('Failed to load a plugin:', err);
            throw err;
        }
    });
    next();
};

exports.register.attributes = {
    name: 'genericPlugins',
    version: '1.0.0'
};
