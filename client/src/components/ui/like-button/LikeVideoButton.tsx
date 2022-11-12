import { FC, MouseEventHandler } from "react";
import { RiHeart2Fill } from "react-icons/ri";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { videoApi } from "../../../store/api/video.api";
import { Button } from "../button/Button";
import styles from './LikeVideoBtn.module.scss'


const LikeVideoButton: FC<{ videoId: number }> = ({ videoId }) => {

    const {user} = useAuth();
    const {addMsg} = useActions();

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
                <RiHeart2Fill />
                Like
            </Button>
        </div>
    )
}

export default LikeVideoButton;