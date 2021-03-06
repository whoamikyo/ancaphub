const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    // For this line we have to reassign, it's not working otherwise
    // TODO: a workaround
    // eslint-disable-next-line no-param-reassign
    file.name = `file-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, file.name);
  },
});

module.exports = {
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/epub+zip',
      'application/x-mobipocket-ebook',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
