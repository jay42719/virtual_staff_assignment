'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    metadata: {
        type: Object,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tbl_file', FileSchema);