'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var EventSchema = new Schema({
    title: String,
    allDay: Boolean,
    start: Date,
    end: Date,
    className: [],
    editable: Boolean,
    startEditable: Boolean,
    durationEditable: Boolean,
    color: String,
    backgroundColor: String,
    borderColor: String,
    textColor: String,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
EventSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

EventSchema.path('start').validate(function(date) {
    return date.length;
}, 'Start date cannot be blank');

EventSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};


mongoose.model('Event', EventSchema);
