var Joi = require('joi');
var Google = require('googleapis');
var Settings = require('../config/settings');
var Model = require('./model');

exports.register = function(server, options, next) {

    server.route({
        method: 'POST',
        path: '/register',
        config: {
            handler: function (request, reply) {
                var OAuth2 = Google.auth.OAuth2;
                var oauth2Client = new OAuth2(Settings.googleApiKey.clientId, Settings.googleApiKey.clientSecret, server.info.uri + Settings.googleApiKey.redirect_uri);
                Google.options({ auth: oauth2Client });
                var plus = Google.plus('v1');
                oauth2Client.setCredentials({
                    access_token: request.payload.token
                });
                plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
                    if(err) {
                        return reply(err);
                    }
                    //TODO: Get rid of this
                    response = {
                        "kind": "plus#person",
                        "etag": "\"RqKWnRU4WW46-6W3rWhLR9iFZQM/QbiaapT7B3glXGApWJQMQuM-NyU\"",
                        "emails": [
                            {
                                "value": "zeroq.official@gmail.com",
                                "type": "account"
                            }
                        ],
                        "objectType": "person",
                        "id": "108533948658968920571",
                        "displayName": "",
                        "name": {
                            "familyName": "",
                            "givenName": ""
                        },
                        "image": {
                            "url": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
                            "isDefault": true
                        },
                        "isPlusUser": false,
                        "circledByCount": 0,
                        "verified": false
                    };
                    return reply(response);
                });
            },
            validate: {
                payload: {
                    token: Joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        config: {
            auth: false,
            handler: function (request, reply) {
                request.auth.session.clear();
                reply.redirect('/index');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/home',
        config: {
            auth: 'zeroq-cookie',
            handler: function (request, reply) {
                var vendor = {
                    "kind": "plus#person",
                    "etag": "\"RqKWnRU4WW46-6W3rWhLR9iFZQM/QbiaapT7B3glXGApWJQMQuM-NyU\"",
                    "emails": [
                        {
                            "value": "zeroq.official@gmail.com",
                            "type": "account"
                        }
                    ],
                    "objectType": "person",
                    "id": "108533948658968920571",
                    "displayName": "",
                    "name": {
                        "familyName": "",
                        "givenName": ""
                    },
                    "image": {
                        "url": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
                        "isDefault": true
                    },
                    "isPlusUser": false,
                    "circledByCount": 0,
                    "verified": false
                };
                Model.api.createOrUpdateVendorFromGoogleData(vendor, function(err, obj) {
                    if(err) {
                        return reply(err);
                    }
                    return reply(obj);
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/profile',
        config: {
            auth: 'google',
            handler: function (request, reply) {
                return reply(request.auth.credentials);
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'vendorPlugin',
    version: '1.0.0'
};