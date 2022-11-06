import { Entity, Column, OneToMany, ManyToMany, ManyToOne} from 'typeorm';
import { Base } from '../../utils/base';
import { VideoEntity } from '../video/video.entity';


@Entity('User')

export class UserEntity extends Base{
    @Column({unique: true})
    email!: string

    @Column({default: ''})
    name!: string

    @Column({select: false})
    password!: string

    @Column({default: false, name: 'is_verified'})
    isVerified!: boolean

    @Column({default: 0, name: 'subscribers_count'})
    subscrubersCount!: number
    
    @Column({default:'', type:'text'})
    description!: string

    @Column({default:'', name: 'avatar_path'})
    avatarPath!: string

    @OneToMany(() => UserEntity, user => user.subscriptions)
    subscribers!: UserEntity[];

    @ManyToOne(() => UserEntity, user => user.subscribers)
    subscriptions!: UserEntity[];

    @OneToMany(() => VideoEntity, video => video.user)
    videos!: VideoEntity[]

    @ManyToMany(() => VideoEntity, video => video.likedBy)
    likedVideos!: VideoEntity[]
}