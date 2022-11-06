import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { CommentEntity } from "../comments/comment.entity";
import { UserEntity } from "../user/user.entity";
import { Base } from "../../utils/base";

@Entity('Video')

export class VideoEntity extends Base {
    @Column()
    name!: string

    @Column({default:false, name: 'is_public'})
    isPublic!: boolean

    @Column({default: 0})
    duration!: number

    @Column({default: 0, name: 'comments_count'})
    commentsCount!: number

    @Column({default: 0})
    likes!: number

    @Column({default: ''})
    description!: string

    @Column({default: 0})
    views!: number

    @Column({default: '', name: 'video_path'})
    videoPath!: string

    @Column({default:'', name: 'thumbnail_path'})
    thumbnailPath!: string


    @ManyToOne(() => UserEntity, user => user.videos, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'user_id'})
    user!: UserEntity

    @OneToMany(() => CommentEntity, comment => comment.video)
    comments!: CommentEntity[]

    @ManyToMany(() => UserEntity, user => user.likedVideos)
    likedBy!: UserEntity[]
}