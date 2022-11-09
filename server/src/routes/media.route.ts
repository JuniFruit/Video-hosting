import express from 'express';
import fileUpload from 'express-fileupload';
import { MediaService } from '../media/media.service';
const router = express.Router();


router.post('/upload', fileUpload({createParentPath: true}), (req, res) => {
    try {
        console.log(req.files);
        const mediaData = MediaService.saveMedia(req.files)
        res.send(mediaData);
    } catch (e:any) {
        res.status(500).send({message: e.message})
    }
})


export default router;