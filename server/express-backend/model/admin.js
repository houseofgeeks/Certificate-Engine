var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
});

var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
