﻿var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var strLenValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 64],
        message: '字符串长度域是 2 - 64。'
    })
];

var NodeSchema = new Schema({
    id: Number,
    hubid: Number,
    type: { type: String, enum: ['value', 'switcher', 'gps', 'gen', 'photo', 'gencontrol', 'rangecontrol'] },
    title: { type: String, required: true, validate: strLenValidator },
    about: { type: String, required: true , validate: strLenValidator },
    tags: { type: [String], required: true },
    unit: {
        name: { type: String },
        symbol: { type: String },
    },
    range: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        step: { type: Number, required: true }
        }
});

NodeSchema.plugin(autoIncrement.plugin, { model: 'Node', field: 'id', startAt: 1, incrementBy: 1 });
NodeSchema.index({ id: 1, hubid: 1 }, { unique: true });

module.exports = mongoose.model('Node', NodeSchema);