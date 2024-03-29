import express from 'express';
import fileUpload from 'express-fileupload';
import { MediaService } from '../media/media.service';
import { FILE_SIZE_LIMIT } from '../utils/utils';
const router = express.Router();


router.post('/upload', fileUpload(
    {
        createParentPath: true,
        limits: { fileSize: FILE_SIZE_LIMIT },
        responseOnLimit: "File exceeded the limit. Max is 1GB"
    }), async (req, res) => {

        try {
            const mediaData = await MediaService.saveMedia(req.files)
            res.send(mediaData);

        } catch (e: any) {
            console.log(e)
            res.status(500).send({ message: e.message })
        }
    })


export default router;