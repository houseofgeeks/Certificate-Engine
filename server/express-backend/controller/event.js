exports.createEvent = (req, res, next) => {
    var Model = require('../model/event');
    var model = new Model({ title: req.body.title, data: req.body.data });
    model.save()
        .then(doc => {
            var Atten = require('../model/attendance');
            var atten = new Atten({
                title: req.body.title,
                data: { id: 0, presence: 0 }
            });

            atten.save()
                .then(doc => {
                    res.json({ success: 'True', data: doc });
                })
                .catch(err => {
                    res.json({ success: 'False', data: err });

                });
        })
        .catch(err => {
            res.json({ success: 'False', data: err });

        });
};

exports.stopEvent = (req, res, next) => {
    var Model = require('../model/event');
    Model.deleteMany({ title: req.body.title }, function (err, docs) {
        if (err || !docs) {
            console.log("Error in deleting Event");
            res.json({ success: 'False', data: "Error in Deleting Event" });
        } else {
            console.log("User deleted");
                var Form = require('../model/attendance');
                Form.deleteMany({ title: req.body.title },
                    function (err, docs) {
                        if (err || !docs) {
                            console.log("Error in deleting Sheet");
                            res.json({ success: 'False', data: "Error in Deleting Sheet" });
                        } else {
                            console.log("Sheet deleted");
                            res.json({ success: 'True', data: "Event Deleted Successfully" });
                        }
                    });
        }
    });
};

exports.getEvent = (req, res, next) => {
    var Model = require('../model/event');
    Model.findOne({ title: req.body.title }, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False', data: 'No Data Found' });
        } else {
            res.json({ success: 'True', data: docs });
        }
    });
};