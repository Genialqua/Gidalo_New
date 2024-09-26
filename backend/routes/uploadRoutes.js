import express from 'express';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Google Cloud Storage setup using environment variable for credentials
const storageClient = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS), // Ensure this is valid JSON
  projectId: 'gidalo',
});
const bucketName = 'gidalo_bucket';

// Multer setup for in-memory storage
const memoryStorage = multer.memoryStorage();
const uploadToGCS = multer({ storage: memoryStorage });

// Google Cloud Storage upload route
router.post('/gcs', uploadToGCS.array('images', 10), async (req, res) => {
    try {
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).json({ success: 0, message: 'No files uploaded.' });
        }

        const uploadedFiles = await Promise.all(
            req.files.map(async (file) => {
                const uniqueName = `${uuidv4()}-${file.originalname}`;
                const bucket = storageClient.bucket(bucketName);
                const gcsFile = bucket.file(uniqueName);

                await gcsFile.save(file.buffer, {
                    metadata: {
                        contentType: file.mimetype,
                    },
                });

                const publicURL = `https://storage.googleapis.com/${bucketName}/${uniqueName}`;
                return publicURL;
            })
        );

        res.json({ success: 1, images: uploadedFiles.join(',') });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: 0, message: 'Internal Server Error.' });
    }
});

// Handle in-memory upload (non-persistent for Vercel)
router.post('/local', uploadToGCS.array('images', 5), (req, res) => {
    try {
        const files = req.files.map(file => ({
            filename: file.originalname,
            mimetype: file.mimetype,
            buffer: file.buffer,
        }));

        res.status(200).send({
            message: 'Images uploaded successfully (in-memory, non-persistent on Vercel)',
            images: files,
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

export default router;






// import express from 'express';
// import multer from 'multer';
// import { Storage } from '@google-cloud/storage';
// import { v4 as uuidv4 } from 'uuid';


// const router = express.Router();

// // Google Cloud Storage setup
// const storageClient = new Storage({
//   credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
//   //keyFilename: '/Users/admin/Gidalo_new/backend/gidalo_cloud.json',
//     projectId: 'gidalo',
// });
// const bucketName = 'gidalo_bucket';

// // Multer setup for memory storage
// const memoryStorage = multer.memoryStorage();
// const uploadToGCS = multer({ storage: memoryStorage });

// // Google Cloud Storage upload route
// router.post('/gcs', uploadToGCS.array('images', 10), async (req, res) => {
//     //console.log("In image controller backend for Google Cloud");
//     try {
//         if (!req.files || !Array.isArray(req.files)) {
//             return res.status(400).json({ success: 0, message: 'No files uploaded.' });
//         }

//         const uploadedFiles = await Promise.all(
//             req.files.map(async (file) => {
//                 const fileBuffer = file.buffer;
//                 const originalName = file.originalname;
//                 const uniqueName = `${uuidv4()}-${originalName}`; // Generate a unique filename

//                 const bucket = storageClient.bucket(bucketName);
//                 const gcsFile = bucket.file(uniqueName);

//                 await gcsFile.save(fileBuffer, {
//                     metadata: {
//                         contentType: file.mimetype,
//                     },
//                 });

//                 //const publicURL = `https://storage.cloud.google.com/${bucketName}/${uniqueName}`;
//                 const publicURL = `https://storage.googleapis.com/${bucketName}/${uniqueName}`;
//                 return publicURL;
//             })
//         );

//         const imageUrls = uploadedFiles.join(','); // Join URLs with a comma
//         res.json({ success: 1, images: imageUrls });
//         //console.log("Images saved to Google Cloud Storage!");
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: 0, message: 'Internal Server Error.' });
//     }
// });

// // Handle the /local route as an in-memory upload for Vercel (temporary storage, non-persistent)
// router.post('/local', uploadToGCS.array('images', 5), (req, res) => {
//     try {
//         const files = req.files.map(file => ({
//             filename: file.originalname,
//             mimetype: file.mimetype,
//             buffer: file.buffer,
//         }));

//         res.status(200).send({
//             message: 'Images uploaded successfully (in-memory, non-persistent on Vercel)',
//             images: files,
//         });
//     } catch (err) {
//         return res.status(400).send({ message: err.message });
//     }
// });

// export default router;





// import express from 'express';
// import multer from 'multer';
// import { Storage } from '@google-cloud/storage';

// const router = express.Router();

// // Google Cloud Storage setup
// const storageClient = new Storage({
//     keyFilename: '/Users/admin/Gidalo_new/backend/gidalo_cloud.json',  // Ensure this path is correct relative to your running directory
//     projectId: 'gidalo'
// });
// const bucketName = 'gidalo_bucket';

// // Multer setup for memory storage (for Google Cloud Storage)
// const memoryStorage = multer.memoryStorage();
// const uploadToGCS = multer({ storage: memoryStorage });

// // Multer setup for in-memory storage (for Vercel)
// const uploadToMemory = multer({ storage: multer.memoryStorage() });

// // Google Cloud Storage upload route
// router.post('/gcs', uploadToGCS.array('images', 10), async (req, res) => {
//     console.log("In image controller backend for Google Cloud Storage");
//     try {
//         if (!req.files || !Array.isArray(req.files)) {
//             return res.status(400).json({ success: 0, message: 'No files uploaded.' });
//         }

//         const uploadedFiles = await Promise.all(
//             req.files.map(async (file) => {
//                 const fileBuffer = file.buffer;
//                 const originalName = file.originalname;

//                 const bucket = storageClient.bucket(bucketName);
//                 const gcsFile = bucket.file(originalName);

//                 await gcsFile.save(fileBuffer, {
//                     metadata: {
//                         contentType: file.mimetype,
//                     },
//                     //public: true,
//                 });

//                 const publicURL = `https://storage.googleapis.com/${bucketName}/${originalName}`;
//                 return publicURL;
//             })
//         );

//         res.json({ success: 1, files: uploadedFiles });
//         console.log("Images saved to Google Cloud Storage!");
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: 0, message: 'Internal Server Error.' });
//     }
// });

// // Handle the /local route as an in-memory upload for Vercel (temporary storage, non-persistent)
// router.post('/local', uploadToMemory.array('images', 5), (req, res) => {
//     try {
//         const files = req.files.map(file => ({
//             filename: file.originalname,
//             mimetype: file.mimetype,
//             buffer: file.buffer
//         }));

//         res.status(200).send({
//             message: 'Images uploaded successfully (in-memory, non-persistent on Vercel)',
//             images: files,
//         });
//     } catch (err) {
//         return res.status(400).send({ message: err.message });
//     }
// });

// export default router;





// import path from 'path';
// import express from 'express';
// import multer from 'multer';

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function fileFilter(req, file, cb) {
//   const filetypes = /jpg|jpeg|png|webp/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype.split('/')[1]);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Images only!'));
//   }
// }

// const upload = multer({ storage, fileFilter });
// const uploadMultipleImages = upload.array('images', 5); // Adjust the number as needed

// router.post('/', (req, res) => {
//   uploadMultipleImages(req, res, function (err) {
//     if (err) {
//       return res.status(400).send({ message: err.message });
//     }

//     const filePaths = req.files.map(file => `/${file.path}`);
    
//     res.status(200).send({
//       message: 'Images uploaded successfully',
//       images: filePaths,
//     });
//   });
// });

// export default router;
