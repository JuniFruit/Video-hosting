import express from 'express';
import fileUpload from 'express-fileupload';
const router = express.Router();


router.post('upload_video', fileUpload({createParentPath: true}), (req, res) => {
    const files = req.files
})