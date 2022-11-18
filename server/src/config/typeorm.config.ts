
import { VideoEntity } from '../entities/video/video.entity';
import { UserEntity } from '../entities/user/user.entity';
import { CommentEntity } from '../entities/comments/comment.entity';
import { DataSourceOptions } from 'typeorm';
import { SubscriptionEntity } from '../entities/user/subscriptions.entity';
import dotenv from 'dotenv';

dotenv.config();

export const getConfigTypeOrm = ():DataSourceOptions => {
    return {
        type: "postgres",
        url: process.env.DB_URL,
        synchronize: true,
        logging: false,
        entities: [VideoEntity, UserEntity, CommentEntity, SubscriptionEntity]
    }
}