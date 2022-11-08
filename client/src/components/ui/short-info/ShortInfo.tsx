import { FC } from 'react';
import { IUser } from '../../../types/user.interface';
import { formatToKilo } from '../../../utils/format.utils';
import { UserAvatar } from '../user-avatar/UserAvatar';
import styles from './ShortInfo.module.scss';

export const ShortInfo: FC<{ channel: IUser, message?: string }> = ({ channel, message }) => {
    return (

        <div className={styles.info_wrapper}>
            <UserAvatar 
                avatarPath={channel.avatarPath}
                isVerified={channel.isVerified} 
                id={channel.id}
            
            />
            <div>
                <div className={styles.name}>
                    {channel.name}
                </div>
                <div className={styles.subscribers_count}>
                    {message || formatToKilo(channel.subscrubersCount || 0) + ' subscribers'}
                </div>
            </div>
        </div>

    )
}
