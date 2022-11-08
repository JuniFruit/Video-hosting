import { FC } from 'react';
import { BsPersonPlusFill } from 'react-icons/bs';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../store/api/api';
import styles from './Subscribe.module.scss';
export const Subscribe: FC<{ channelIdToSub: number | undefined }> = ({ channelIdToSub }) => {

    const { user } = useAuth();

    const { data: profile } = api.useGetProfileQuery(2, {
        skip: !user
    })
    const [subscribe, { isLoading, data: isDone }] = api.useSubscribeMutation()

    const isSubscribed = profile?.subscriptions.some(sub => sub.toUser.id === channelIdToSub) || isDone;

    if (profile?.id === channelIdToSub || !channelIdToSub) return null;

    return (
        <button
            onClick={(e) => { e.preventDefault(); subscribe({id: profile?.id || 1, channelToSub: channelIdToSub}).unwrap() }}
            className={`${styles.button} ${isSubscribed && styles.subscribed}`}
            disabled={isLoading}>

            <BsPersonPlusFill />
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    )
}