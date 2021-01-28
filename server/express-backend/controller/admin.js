exports.isAuth = (req, res, next) => {
    var Model = require('../model/admin');
    Model.findOne({ userid: req.body.userid, password: req.body.password }, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False' });
        } else {
            res.json({ success: 'True' });
        }
    });
};