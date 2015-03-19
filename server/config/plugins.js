//Good: Logging plugin
var Good = require('good');
//Lout: Documentation plugin. Adds endpoint /docs
var Lout = require('lout');
//Boom: HTTP response objects
var Boom = require('boom');
//Bell: Google OAuth
var Bell = require('bell');
//Hapi-Auth-Cookie: Cookie based authentication
var AuthCookie = require('hapi-auth-cookie');

// Options to pass into the 'Good' plugin
var goodOptions = {
    opsInterval: 60000,
    reporters: [{
        reporter: require('good-console'),
        args:[{ ops: '*', request: '*', log: '*', response: '*', 'error': '*' }]
    }]
};

// Load multiple plugins
exports.register = function(server, options, next) {

    server.register([
        {
            register: Good,
            options: goodOptions
        },
        {
            register: Lout
        },
        /*
        {
            register: Boom
        },*/
        {
            register: Bell
        },
        {
            register: AuthCookie
        }
    ], function (err) {
        if (err) {
            console.error('Failed to load a plugin:', err);
            throw err;
        }

        //Options to pass into the 'Bell' plugin
        var bellOptions = {
            provider: 'google',
            password: 'google-encryption-password',
            isSecure: false,
            clientId: '1079152163076-3f2agu06euicsf73ltpel8kmansfdom9.apps.googleusercontent.com',
            clientSecret: 'PDxaxnWpSVgYx6VaSEMNENDQ',
            providerParams: {
                redirect_uri: server.info.uri + '/home'
            }
        };

        //Options to pass into the 'AuthCookie' plugin
        var authCookieOptions = {
            password: 'cookie-encryption-password',
            cookie: 'zeroq-auth', // Name of cookie to set
            isSecure: false,
            redirectTo: '/login',
            appendNext: true
        };

        server.auth.strategy('google', 'bell', bellOptions);
        server.auth.strategy('zeroq-cookie', 'cookie', authCookieOptions);
        //server.auth.default('zeroq-cookie');

    });

    next();
};

exports.register.attributes = {
    name: 'genericPlugins',
    version: '1.0.0'
};
