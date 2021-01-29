exports.markSheet = (req, res, next) => {
    var Model = require('../model/attendance');
    Model.findOne({ title: req.body.title }, function (err, sheet) {
    
        if (err || !sheet) {
            res.json({ success: 'False', data: 'No Sheet Found' });
        } else {
            Model.deleteMany({ title: req.body.title }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Sheet");
                    res.json({ success: 'False', data: "Error in Updating Sheet" });
                } else {
                    var model = new Model({ title: req.body.title, data:[] });
                    var flag = false;
                    for (var i of sheet.data) {
                        if (i.id === req.body.id) {
                            i.presence = "1";
                            flag = true;
                        }
                        model.data.push(i);
                    }

                    console.log(model);

                    model.save()
                        .then(doc => {
                            console.log("Marked");
                            if (flag === true) res.json({ success: 'True', data: doc });
                            else res.json({ success: 'False', data:"Attende not Found" });
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
            res.json({ success: 'False', data: 'No Sheet Found' });
        } else {
            Model.deleteMany({ title: req.body.title }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Sheet");
                    res.json({ success: 'False', data: "Error in Updating Sheet" });
                } else {
                    var model = new Model({ title: req.body.title, data: [] });
                    var flag = false;
                    for (var i of sheet.data) {
                        if (i.id === req.body.id) {
                            console.log(i);
                            i.presence = "0";
                            flag = true;
                        }
                        model.data.push(i);
                    }

                    console.log(model);

                    model.save()
                        .then(doc => {
                            console.log("UnnMarked");
                            if (flag === true) res.json({ success: 'True', data: doc });
                            else res.json({ success: 'False', data: "Attende not Found" });
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

exports.addSheet = (req, res, next) => {
    var Model = require('../model/attendance');
    Model.findOne({ title: req.body.title }, function (err, sheet) {

        if (err || !sheet) {
            res.json({ success: 'False', data: 'No Sheet Found' });
        } else {
            Model.deleteMany({ title: req.body.title }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Sheet");
                    res.json({ success: 'False', data: "Error in Updating Sheet" });
                } else {
                    var model = new Model({ title: req.body.title, data: [] });
                    for (var i of sheet.data) {
                        model.data.push(i);
                    }

                    model.data.push({id:req.body.id, presence:"0"});

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


exports.getSheet = (req, res, next) => {
    var Model = require('../model/attendance');
    Model.findOne({ title: req.body.title }, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False', data: 'No Data Found' });
        } else {
            res.json({ success: 'True', data: docs });
        }
    });
};

