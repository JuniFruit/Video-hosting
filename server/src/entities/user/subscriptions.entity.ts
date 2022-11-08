import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../utils/base';
import { UserEntity } from './user.entity';

@Entity('Subscription')

export class SubscriptionEntity extends Base {
    @ManyToOne(() => UserEntity, user => user.subscriptions)
    @JoinColumn({name: 'from_user'})
    fromUser!: UserEntity

    @ManyToOne(() => UserEntity, user => user.subscribers)
    @JoinColumn({name: 'to_user'})
    toUser!: UserEntity
}