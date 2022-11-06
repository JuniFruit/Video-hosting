
import { VideoEntity } from '../entities/video/video.entity';
import { UserEntity } from '../entities/user/user.entity';
import { CommentEntity } from '../entities/comments/comment.entity';
import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const getConfigTypeOrm = ():DataSourceOptions => {
    return {
        type: "postgres",
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        port: Number(process.env.DB_PORT),
        synchronize: true,
        logging: true,
        entities: [VideoEntity, UserEntity, CommentEntity]
    }
}