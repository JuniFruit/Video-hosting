import { getConfigTypeOrm } from '../config/typeorm.config';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user/user.entity';
import { VideoEntity } from '../entities/video/video.entity';
import { CommentEntity } from '../entities/comments/comment.entity';
import { SubscriptionEntity } from '../entities/user/subscriptions.entity';


const postgresDB = new DataSource(getConfigTypeOrm());

postgresDB.initialize()
    .then(() => {
        console.log('success');


    })
    .catch((e) => console.log(e));


export const userRepository = postgresDB.getRepository(UserEntity);
export const videoRepository = postgresDB.getRepository(VideoEntity);
export const commentRepository = postgresDB.getRepository(CommentEntity);
export const subscriptionsRespository = postgresDB.getRepository(SubscriptionEntity);
