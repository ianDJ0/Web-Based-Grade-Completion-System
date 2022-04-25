const multer = require('multer');
const uuid = require('uuid');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'uploads/images')
        },
        filename: (req, file, callback) => {
            let ext = MIME_TYPE_MAP[file.mimetype];
            callback(null, uuid.v4() + '.' + ext);
        }
    }),
    fileFilter: (req,file, callback)=>{
        const fileIsValid = !!MIME_TYPE_MAP[file.mimetype];
        let err = fileIsValid ? null : new Error('Invalid File Type');
        callback(err, fileIsValid);
    }
});

module.exports = fileUpload;