import {validate} from 'class-validator';
import { RequestHandler } from 'express';
import { CommentDto } from '../entities/comments/comment.dto';
import { formErrorMessage } from '../utils/utils';

const commentValidation:RequestHandler = async (req, res, next) => {

    const comment = new CommentDto()
    
    comment.body = req.body.dto.body;
    comment.videoId = req.body.dto.videoId;
    
    const errors = await validate(comment);

    if (errors.length) {
        console.log(errors);
        return res.status(500).send({message: formErrorMessage(errors)});
    }
    next()
}

export default commentValidation;