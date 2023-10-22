const upload = require('../config/config-multer');

const validateUpload = upload.single('avatar');

module.exports = validateUpload;