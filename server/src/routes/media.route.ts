import express from 'express';
import fileUpload from 'express-fileupload';
import { MediaService } from '../media/media.service';
const router = express.Router();


router.post('/upload', fileUpload({createParentPath: true}), async (req, res) => {
    try {
        const folder = req.query.folder;
        const mediaData = await MediaService.saveMedia(req.files, folder?.toString())
        res.send(mediaData);
    } catch (e:any) {
        res.status(500).send({message: e.message})
    }
})


export default router;