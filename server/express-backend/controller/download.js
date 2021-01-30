

const PDFDocument = require('pdfkit');
const fs = require('fs');
var QRCode = require('qrcode');
const doc = new PDFDocument();
var zip = require('express-zip');

exports.downloadSheet = (req, res, next) => {

    var Model = require('../model/attendance');
    Model.findOne({ title: req.body.title }, async function  (err, sheet)  {
    
        if (err || !sheet) {
            res.json({ success: 'False', data: 'No Sheet Found' });
        } else {

            var rep = []
            for (i of sheet.data) {
                console.log(i['id']);
                await QRCode.toFile(i['id'] +'.png', JSON.stringify(i));
                rep.push({path: i['id'] + '.png', name: i['id']});
            }
            await res.zip(rep,"sheet.zip", ()=>{
                for (i of sheet.data) {
                    fs.unlink(i['id'] + '.png', (err) => {
                    });
                }
            });
        }
    });
};

exports.downloadData = (req, res, next) => {
    res.send("Data");
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.image('output.png', {
        align: 'center',
        valign: 'center'
    });

    doc.addPage().
        fontSize(25).
        text("Hi");

    doc.end();

};

exports.downloadCertificate = (req, res, next) => {
    res.send("Certificate");
};
