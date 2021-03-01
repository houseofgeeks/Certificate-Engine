var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://prskid1000:nIELmPiB3vZ4YkWQ@cluster0-qxsqv.mongodb.net/cehg?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));
db.on('open', console.error.bind(console, 'MongoDB Connected Succesfully'));

var express = require('express');
var app = express();

var multer = require('multer');
var upload = multer();
app.use(upload.array('files', 12));
app.use(express.static('public'));


var cors = require('cors');
app.use(cors({origin: true}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const admin = require('./controller/admin');
const event = require('./controller/event');
const form = require('./controller/form');
const attendance = require('./controller/attendance');
const download = require('./controller/download');

app.post('/isauth', admin.isAuth);

app.post('/createevent', event.createEvent);
app.post('/stopevent', event.stopEvent);
app.post('/getevent', event.getEvent);

app.post('/createform', form.createForm);
app.post('/stopform', form.stopForm);
app.post('/getform', form.getForm);
app.post('/submitform',form.submitForm);

app.post('/marksheet', attendance.markSheet);
app.post('/unmarksheet', attendance.unmarkSheet);
app.post('/addsheet', attendance.addSheet);
app.post('/getsheet', attendance.getSheet);

app.post('/certificate', download.downloadCertificate);
app.post('/sheet', download.downloadSheet);
app.post('/data', download.downloadData);
app.get('/verify', download.verifyCertificate)

app.listen(process.env.PORT || 3001,
    () => console.log("Server is running..."));
console.log('CE BackEnd');
