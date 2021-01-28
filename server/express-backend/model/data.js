var mongoose = require('mongoose');
var DataSchema = new mongoose.Schema({
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
    data: {
        type: String,
        required: true
    },

    file:{
        type:Buffer
    }
    
});

var Data = mongoose.model('Data', DataSchema);
module.exports = Data;
