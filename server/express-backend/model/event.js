var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    data: {
        type: String,
        required: true
    },
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
