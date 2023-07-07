const multer = require('multer');

const storage = multer.diskStorage({

    destination: function (req, uploadedFile, cb) {
        cb(null, `${__dirname}/../public/uploads`)
    },
    filename: function (req, uploadedFile, cb) {
        cb(null, Date.now() + '_' + uploadedFile.originalname)
    }
});
const upload = multer({ storage: storage });

module.exports = upload;