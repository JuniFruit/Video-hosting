import express from 'express';
import { UserService } from '../entities/user/user.service';

const router = express.Router();


router.get('/profile/:id', async (req,res) => {
    try {
        const user = await UserService.getById(Number(req.params.id));
        res.send(user);
    } catch (e:any) {
        res.status(500).send({message: e.message})
    }
})


router.get('/all', async (req, res) => {
    try {
        const users = await UserService.getAll()
        res.send(users)
    } catch (e:any) {
        res.status(500).send({message: e.message});
    }
})

router.get('/by_id/:id', async (req, res) => {
    try {
        const user = await UserService.getById(Number(req.params.id));
        res.send(user)
    } catch (e:any) {
        res.status(500).send({message: e.message});
    }
})

router.post('/subscribe', async (req, res) => {
    try{        
        const subSuccess = await UserService.subscribe(req.body.userId, req.body.channelToSub)
        res.send(subSuccess);
    } catch (e:any) {   
        res.status(500).send({message: e.message});
    }
})


export default router;