const PDFDocument = require('pdfkit');
const fs = require('fs');
var QRCode = require('qrcode');
const doc = new PDFDocument();
var zip = require('express-zip');

const distanceMargin = 18;
const maxWidth = 140;
const maxHeight = 70;
const lineSize = 174;
const signatureHeight = 390;
const startLine1 = 128;
const endLine1 = 128 + lineSize;
const startLine2 = endLine1 + 32;
const endLine2 = startLine2 + lineSize;
const startLine3 = endLine2 + 32;
const endLine3 = startLine3 + lineSize;

function jumpLine(doc, lines) {
    for (let index = 0; index < lines; index++) {
        doc.moveDown();
    }
}

exports.downloadSheet = (req, res, next) => {

    var Model = require('../model/attendance');
    Model.findOne({ title: req.body.title }, async function  (err, sheet)  {
    
        if (err || !sheet) {
            res.json({ success: 'False', data: 'No Sheet Found' });
        } else {
            var rep = []
            for (i of sheet.data) {
                if (i['id'] === "0") continue;
                i['title'] = req.body;
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

    doc.addPage().
        fontSize(25).
        text("Hi");

    doc.end();

};

exports.downloadCertificate = (req, res, next) => {
    var Model = require('../model/attendance');
    Model.findOne({ title: req.body.title }, async function (err, sheet) {

        if (err || !sheet) {
            res.json({ success: 'False', data: 'No Sheet Found' });
        } else {

            var rep = []
            for (i of sheet.data) {

                if (i['id'] === "0") continue;
           
                const doc = new PDFDocument({
                    layout: 'landscape',
                    size: 'A4',
                });

                doc.pipe(fs.createWriteStream(i['id'] + '.pdf'));
                doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');
                doc.fontSize(10);
                doc
                    .fillAndStroke('#0e8cc3')
                    .lineWidth(20)
                    .lineJoin('round')
                    .rect(
                        distanceMargin,
                        distanceMargin,
                        doc.page.width - distanceMargin * 2,
                        doc.page.height - distanceMargin * 2,
                    )
                    .stroke();

                jumpLine(doc, 2)
                doc
                    .fontSize(16)
                    .fill('#021c27')
                    .text('CERTIFICATE OF PARTICIPATION', {
                        align: 'center',
                    });

                jumpLine(doc, 1)
                doc
                    .fontSize(10)
                    .fill('#021c27')
                    .text('Present to', {
                        align: 'center',
                    });

                jumpLine(doc, 2)
                doc
                    .fontSize(24)
                    .fill('#021c27')
                    .text(i['id'], {
                        align: 'center',
                    });

                jumpLine(doc, 1)
                doc
                    .fontSize(16)
                    .fill('#021c27')
                    .text('For Participation in  ' + req.body.title, {
                        align: 'center',
                    });

                jumpLine(doc, 7)
                doc.lineWidth(1);
                doc.fillAndStroke('#021c27');
                doc.strokeOpacity(0.2);

                
                doc
                    .moveTo(startLine1, signatureHeight)
                    .lineTo(endLine1, signatureHeight)
                    .stroke();
                doc
                    .moveTo(startLine2, signatureHeight)
                    .lineTo(endLine2, signatureHeight)
                    .stroke();

                doc
                    .moveTo(startLine3, signatureHeight)
                    .lineTo(endLine3, signatureHeight)
                    .stroke();

                doc
                    .fontSize(10)
                    .fill('#021c27')
                    .text('NAME', startLine1, signatureHeight + 10, {
                        columns: 1,
                        columnGap: 0,
                        height: 40,
                        width: lineSize,
                        align: 'center',
                    });

                doc
                    .fontSize(10)
                    .fill('#021c27')
                    .text('Associate Professor', startLine1, signatureHeight + 25, {
                        columns: 1,
                        columnGap: 0,
                        height: 40,
                        width: lineSize,
                        align: 'center',
                    });

                doc
                    .fontSize(10)
                    .fill('#021c27')
                    .text(i['id'], startLine2, signatureHeight + 10, {
                        columns: 1,
                        columnGap: 0,
                        height: 40,
                        width: lineSize,
                        align: 'center',
                    });

                doc
                    .fontSize(10)
                    .fill('#021c27')
                    .text('Student', startLine2, signatureHeight + 25, {
                        columns: 1,
                        columnGap: 0,
                        height: 40,
                        width: lineSize,
                        align: 'center',
                    });

                doc
                    .fontSize(10)
                    .fill('#021c27')
                    .text('NAME', startLine3, signatureHeight + 10, {
                        columns: 1,
                        columnGap: 0,
                        height: 40,
                        width: lineSize,
                        align: 'center',
                    });

                doc
                    .fontSize(10)
                    .fill('#021c27')
                    .text('Director', startLine3, signatureHeight + 25, {
                        columns: 1,
                        columnGap: 0,
                        height: 40,
                        width: lineSize,
                        align: 'center',
                    });

                doc.end();
                rep.push({ path: i['id'] + '.pdf', name: i['id'] });
            }

            await res.zip(rep, "certificate.zip", () => {
                for (i of sheet.data) {
                    fs.unlink(i['id'] + '.pdf', (err) => {
                    });
                }
            });
        }
    });
};
