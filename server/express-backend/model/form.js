var mongoose = require('mongoose');
var FormSchema = new mongoose.Schema({
    etitle: {
        type: String,
        required: true,
        trim: true
    },
    ftitle: {
        type: String,
        required: true,
        trim: true
    },
    edata: {
        type: String,
        required: true
    },
    fdata: {
        type: String,
        required: true
    },
});

var Form = mongoose.model('Form', FormSchema);
module.exports = Form;
