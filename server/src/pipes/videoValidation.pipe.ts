import { RequestHandler } from 'express';
import { validate } from 'class-validator';
import {VideoDto} from '../entities/video/video.dto';
import { formErrorMessage } from '../utils/utils';

export const videoValidation: RequestHandler = async (req, res, next) => {

    const video = new VideoDto();
    video.description = req.body.dto.description;
    video.isPublic = req.body.dto.isPublic;
    video.name = req.body.dto.name;
    video.thumbnailPath = req.body.dto.thumbnailPath;
    video.videoPath = req.body.dto.videoPath;

    const errors = await validate(video);

    if (errors.length) {
        return res.status(500).send({message: formErrorMessage(errors)});

    }
    next()
}