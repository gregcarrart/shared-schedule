'use strict';

// Articles routes use articles controller
var events = require('../controllers/events');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.event.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.route('/schedule')
        .get(events.all)
        .post(authorization.requiresLogin, events.create);
    app.route('/schedule/:eventId')
        .get(events.show)
        .put(authorization.requiresLogin, hasAuthorization, events.update)
        .delete(authorization.requiresLogin, hasAuthorization, events.destroy);

    // Finish with setting up the articleId param
    app.param('eventId', events.event);

};