'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.event = function(req, res, next, id) {
    Event.load(id, function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load event ' + id));
        req.event = event;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
    var event = new Event(req.body);
    event.user = req.user;

    event.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                event: event
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
    var event = req.event;

    event = _.extend(event, req.body);

    event.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                event: event
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var event = req.event;

    event.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                event: event
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.event);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Event.find().sort('-created').populate('user', 'name username').exec(function(err, events) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(events);
        }
    });
};
