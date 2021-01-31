const PDFDocument = require('pdfkit');
const fs = require('fs');
var QRCode = require('qrcode');
const doc = new PDFDocument();
var zip = require('express-zip');
const fzip  = require('zip-a-folder');

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

const removeDir = function(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename)
        } else {
          fs.unlinkSync(path + "/" + filename)
        }
      })
      fs.rmdirSync(path)
    } else {
      fs.rmdirSync(path)
    }
  } else {
    console.log("Directory path not found.")
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
    var Model = require('../model/data');
    Model.find({ etitle: req.body.etitle, ftitle: req.body.ftitle }, async function (err, form) {

        if (err || !form) {
            res.json({ success: 'False', data: 'No Form Found' });
        } else {
            var rep = []
            var k = 0;
            for (i of form) {

                var decoded = JSON.parse(i.data);
                await fs.mkdir(k.toString(), () => {});
                const doc = new PDFDocument({ layout: 'portrait', size: 'A4', });
                doc.pipe(fs.createWriteStream(k.toString() + '/' + form[0].etitle + "_" + form[0].ftitle + '.pdf'));

                for(var j = 0; j <  i.file.length; j++)
                {
                    //console.log(i.file[j].name);
                    await fs.writeFile(k.toString() + '/' + i.file[j].name, i.file[j].file, 'binary', () => { });
                }

                doc
                    .fontSize(48)
                    .fill('#021c27')
                    .text(form[0].etitle, {
                        align: 'center',
                    });
                doc
                    .fontSize(36)
                    .fill('#021c27')
                    .text(form[0].ftitle, {
                        align: 'center',
                    });
                doc.lineWidth(10);
                doc.lineCap('round')
                    .moveTo(150, 50)
                    .lineTo(450, 50)
                    .stroke();
                doc.lineCap('round')
                    .moveTo(150, 180)
                    .lineTo(450, 180)
                    .stroke();
                jumpLine(doc, 3);

                for(var key in decoded)
                {
                    if (key !== "undefined" && key !== "fname" && key !== "ename")
                    {
                        doc
                            .fontSize(36)
                            .fill('#021c27')
                            .text(key + ": " + decoded[key], {
                                align: 'left',
                            });
                    }
                }
                doc
                    .fontSize(36)
                    .fill('#021c27')
                    .text("------------------------------------", {
                        align: 'left',
                    });
                jumpLine(doc, 2);
                await doc.end();
                await fzip.zip(k.toString(), k.toString() + '.zip');
                rep.push({ path: k.toString() + '.zip' , name: k.toString() + '.zip'});    
                k++;
            }

            await res.zip(rep, "form_data.zip", async () => {
                for (var j = 0; j < k; j++) {
                    await removeDir(j.toString());
                    await fs.unlink(j.toString() + '.zip', (err) => {
                    });
                }
            });
        }
    });
};

exports.downloadCertificate = (req, res, next) => {
    var Model = require('../model/attendance');
    Model.findOne({ title: req.body.title }, async function (err, sheet) {

        if (err || !sheet) {
            res.json({ success: 'False', data: 'No Sheet Found' });
        } else {

            var rep = []
            for (i of sheet.data) {

                if (i['id'] === "0" || i['presence'] === "0") continue;
           
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
