import express from 'express';
import { authGuard } from '../auth/auth.guard';
import { CommentService } from '../entities/comments/comment.service';
import commentValidate from '../pipes/commentValidation.pipe';
const router = express.Router();

router.post('/create', authGuard, commentValidate, async (req, res) => {
    try {
        const comment = await CommentService.create(Number(req.body.currentUser), req.body.dto)
        res.send(comment)
    } catch (e: any) {
        res.status(500).send({ message: e.message })
    }
})

export default router;