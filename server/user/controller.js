exports.register = function(server, options, next) {
    server.route({
        method: 'GET',
        path: '/login',
        config: {
            auth: 'google',
            handler: function (request, reply) {
                if (request.auth.isAuthenticated) {
                    request.auth.session.set(request.auth.credentials);
                    if(request.auth.credentials.query.next) {
                        return reply.redirect(request.auth.credentials.query.next);
                    }
                    else {
                        return reply.redirect('/home');
                    }
                }

                reply('Not logged in...').code(401);
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
                return reply('Welcome home');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/profile',
        config: {
            auth: 'zeroq-cookie',
            handler: function (request, reply) {
                return reply(request.auth.credentials);
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'userPlugin',
    version: '1.0.0'
};