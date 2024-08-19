import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype.split('/')[1]);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
}

const upload = multer({ storage, fileFilter });
const uploadMultipleImages = upload.array('images', 5); // Adjust the number as needed

router.post('/', (req, res) => {
  uploadMultipleImages(req, res, function (err) {
    const filePaths = req.files.map(file => `/${file.path}`);
    
    res.status(200).send({
      message: 'Images uploaded successfully',
      images: filePaths,
    });
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    
  });
});

export default router;
