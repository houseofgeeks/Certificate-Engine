var mongoose = require('mongoose');
var AttendanceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    data: [{id:String, presence:String}]
});

var Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;
