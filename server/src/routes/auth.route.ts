
import express from 'express';
import { AuthService } from '../auth/auth.service';

const router = express.Router();

router.post('/login', async(req, res) =>{
    try {
        const loggedUser = await AuthService.login({email: req.body.email, password: req.body.password});
        res.send(loggedUser)
    } catch(e:any) {
        res.status(500).send({message: e.message});
    }
})
router.post('/register', async (req, res) => {
    try {
        const newUser = await AuthService.registerUser(req.body);
        res.send(newUser);

    } catch (e:any) {
        res.status(500).send({message: e.message});
    }
})



export default router;