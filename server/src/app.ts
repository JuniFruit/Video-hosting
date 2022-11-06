import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import commentRouter from './routes/comment.route';
import videoRouter from './routes/video.route';

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);
app.use('/videos', videoRouter);


app.listen(port, () => {
    console.log('Server is online');
})
