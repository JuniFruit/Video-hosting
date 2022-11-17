import express from 'express';
import { authGuard } from '../auth/auth.guard';
import { UserService } from '../entities/user/user.service';
import { userEditValidation } from '../pipes/userValidation.pipe';

const router = express.Router();


router.get('/profile/:id', async (req, res) => {
    try {
        const user = await UserService.getById(Number(req.params.id));
        res.send(user);
    } catch (e: any) {
        res.status(500).send({ message: e.message })
    }
})
router.put('/profile_update/:id', authGuard,userEditValidation, async (req, res) => {
    try {
        const updated = await UserService.update(req.body.data, Number(req.params.id));
        res.send(updated)
    } catch (e: any) {
        res.status(500).send({ message: e.message })
    }

})

router.get('/all', async (req, res) => {
    try {
        const users = await UserService.getAll()
        res.send(users)
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

router.get('/by_id/:id', async (req, res) => {
    try {
        const user = await UserService.getById(Number(req.params.id));
        res.send(user)
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})

router.put('/subscribe', authGuard, async (req, res) => {
    try {
        const subSuccess = await UserService.subscribe(req.body.userId, req.body.channelToSub)
        res.send(subSuccess);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
})


export default router;