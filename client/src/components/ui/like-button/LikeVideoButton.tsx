import { FC, MouseEventHandler } from "react";
import { RiDislikeFill, RiHeart2Fill } from "react-icons/ri";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import { videoApi } from "../../../store/api/video.api";
import { Button } from "../button/Button";
import styles from './LikeVideoBtn.module.scss'


const LikeVideoButton: FC<{ videoId: number }> = ({ videoId }) => {

    const {user} = useAuth();
    const {addMsg} = useActions();

    const {data:profile} = api.useGetProfileQuery(user?.id!, {
        skip: !user
    })
    
    const isLiked = profile?.likedVideos.some(video => video.id === videoId);


    const [updateReaction, { isLoading }] = videoApi.useUpdateReactionMutation()

    const onUpdateReaction: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (!user) return addMsg({message: 'You are not logged in', status: 500})
        updateReaction(videoId)
    }

    return (
        <div className={styles.wrapper}>
            <Button
                disabled={isLoading}
                onClick={onUpdateReaction}
            >
               {isLiked ? <RiDislikeFill /> : <RiHeart2Fill />}
               {isLiked?  'Liked' : 'Like'}
            </Button>
        </div>
    )
}

export default LikeVideoButton;