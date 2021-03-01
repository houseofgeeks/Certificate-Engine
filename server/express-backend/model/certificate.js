var mongoose = require('mongoose');
var CertificateSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        trim: true
    },
    file: {name:String,file: Buffer }
});

var Certificate = mongoose.model('Certificate', CertificateSchema);
module.exports = Certificate;
