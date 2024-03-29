import express from 'express';
import { authGuard } from '../auth/auth.guard';
import { VideoService } from '../entities/video/video.service';
import { videoValidation } from '../pipes/videoValidation.pipe'
const router = express.Router();


router.get('/all', async (req, res) => {
    try {
        const videos = await VideoService.getAll(req.query?.searchTerm?.toString());
        res.send(videos);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})


router.put('/update/:id', authGuard, videoValidation, async (req, res) => {
    try {
        const id = req.params.id;
        const videoDto = req.body.dto;
        const updated = await VideoService.updateVideo(Number(id), videoDto);
        res.send(updated);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }

})

router.get('/by_id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const video = await VideoService.getById(Number(id));
        res.send(video);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

router.get('/most_viewed', async (req, res) => {
    try {
        const videos = await VideoService.getMostViewed();
        res.send(videos);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

router.put('/update_reaction/:id', authGuard, async (req, res) => {
    try {
        const video = await VideoService.updateReaction(Number(req.params.id), Number(req.body.currentUser));
        res.send(video);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

router.post('/create', authGuard, async (req, res) => {
    try {
        const videoId = await VideoService.create(Number(req.body.currentUser));
        res.send(videoId.toString());
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

router.delete('/delete/:id', authGuard, async (req, res) => {
    try {
        await VideoService.delete(Number(req.params.id));
        res.status(200).send()
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})


router.put('/increment_views/:id', async (req, res) => {
    try {
        const result = await VideoService.incrementViews(Number(req.params.id));
        res.send(result);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})


export default router;