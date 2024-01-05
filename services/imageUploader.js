const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync(path.join(__basedir + '/temp/uploads'), { recursive: true });
        cb(null, path.join(__basedir + '/temp/uploads'));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload;