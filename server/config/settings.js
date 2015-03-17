var Path = require('path');

// Defaults that you can access when you require this config.
module.exports = {
    rootPath: Path.normalize(__dirname + '/../..'),
    port: parseInt(process.env.PORT, 10) || 8080,
    host: '127.0.0.1',
    database: {
        host: '127.0.0.1',
        db: 'test'
    }
};