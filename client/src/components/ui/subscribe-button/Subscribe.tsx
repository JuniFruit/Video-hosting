import { FC, MouseEventHandler } from 'react';
import { BsPersonPlusFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../store/api/api';
import styles from './Subscribe.module.scss';
export const Subscribe: FC<{ channelIdToSub: number | undefined }> = ({ channelIdToSub }) => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: profile } = api.useGetProfileQuery(user?.id!, {
        skip: !user
    })
    const [subscribe, { isLoading, data: isDone }] = api.useSubscribeMutation()

    const isSubscribed = profile?.subscriptions.some(sub => sub.toUser.id === channelIdToSub) || isDone;

    
    if (profile?.id === channelIdToSub || !channelIdToSub) return null;
    
    const onSubscribe:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (!user) return navigate('/');

        subscribe({id: profile?.id!, channelToSub: channelIdToSub}).unwrap() 
    }
    return (
        <button
            onClick={onSubscribe}
            className={`${styles.button} ${isSubscribed && styles.subscribed}`}
            disabled={isLoading}>

            <BsPersonPlusFill />
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    )
}