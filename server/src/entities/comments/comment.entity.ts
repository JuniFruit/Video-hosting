import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm'
import { UserEntity } from '../user/user.entity';
import { Base } from '../../utils/base';
import { VideoEntity } from '../video/video.entity';

@Entity('Comment')

export class CommentEntity extends Base {
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'user_id'})
    author!: UserEntity

    @Column({type: 'text'})
    body!: string

    @ManyToOne(() =>  VideoEntity, video => video.comments)
    @JoinColumn({name: 'video_id'})
    video!: VideoEntity
}