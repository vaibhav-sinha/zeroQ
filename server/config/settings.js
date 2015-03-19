var Path = require('path');

// Defaults that you can access when you require this config.
module.exports = {
    rootPath: Path.normalize(__dirname + '/../..'),
    port: parseInt(process.env.PORT, 10) || 8080,
    host: '127.0.0.1',
    database: {
        host: '127.0.0.1',
        db: 'test'
    },
    googleApiKey : {
        clientId: '1079152163076-3f2agu06euicsf73ltpel8kmansfdom9.apps.googleusercontent.com',
        clientSecret: 'PDxaxnWpSVgYx6VaSEMNENDQ',
        redirect_uri: '/home'
    }
};