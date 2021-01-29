exports.createSheet = (req, res, next) => {

    var Model = require('../model/attendance');
    var model = new Model({
        title: req.body.title,
        data: {id:0, presence:0}
    });

    model.save()
        .then(doc => {
            res.json({ success: 'True', data: doc });
        })
        .catch(err => {
            res.json({ success: 'False', data: err });

        });
};

exports.deleteSheet = (req, res, next) => {
    var Form = require('../model/attendance');
    Form.deleteMany({ title: req.body.title },
        function (err, docs) {
            if (err || !docs) {
                console.log("Error in deleting Form");
                res.json({ success: 'False', data: "Error in Deleting Sheet" });
            } else {
                console.log("Sheet deleted");
                res.json({ success: 'True', data: "Sheet Deleted Successfully" });
            }
        });
};

exports.markSheet = (req, res, next) => {
    var Model = require('../model/attendance');
    Model.findOne({ title: req.body.title }, function (err, sheet) {
    
        if (err || !sheet) {
            res.json({ success: 'False', data: 'No Post Found' });
        } else {
            Model.deleteMany({ title: req.body.title }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Sheet");
                    res.json({ success: 'False', data: "Error in Updating Sheet" });
                } else {
                    var model = new Model({ title: req.body.title, data:[] });
                    for (var i of sheet.data) {
                        if (i.id === req.body.id) {
                            console.log(i);
                            i.presence = "1";
                        }
                        model.data.push(i);
                    }

                    console.log(model);

                    model.save()
                        .then(doc => {
                            console.log("Marked");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Sheet");
                            res.json({ success: 'False', data: "Error in Updating Sheet" });
                        });
                }
            });
        }
    });
};

exports.unmarkSheet = (req, res, next) => {
    var Model = require('../model/attendance');
    Model.findOne({ title: req.body.title }, function (err, sheet) {

        if (err || !sheet) {
            res.json({ success: 'False', data: 'No Post Found' });
        } else {
            Model.deleteMany({ title: req.body.title }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Sheet");
                    res.json({ success: 'False', data: "Error in Updating Sheet" });
                } else {
                    var model = new Model({ title: req.body.title, data: [] });
                    for (var i of sheet.data) {
                        if (i.id === req.body.id) {
                            console.log(i);
                            i.presence = "0";
                        }
                        model.data.push(i);
                    }

                    console.log(model);

                    model.save()
                        .then(doc => {
                            console.log("Marked");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Sheet");
                            res.json({ success: 'False', data: "Error in Updating Sheet" });
                        });
                }
            });
        }
    });
};