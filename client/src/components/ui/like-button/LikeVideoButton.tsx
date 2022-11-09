import { FC, MouseEventHandler } from "react";
import { RiHeart2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { videoApi } from "../../../store/api/video.api";
import { Button } from "../button/Button";
import styles from './LikeVideoBtn.module.scss'


const LikeVideoButton: FC<{ videoId: number }> = ({ videoId }) => {

    const {user} = useAuth();
    const navigate = useNavigate();

    const [updateReaction, { isLoading }] = videoApi.useUpdateReactionMutation()

    const onUpdateReaction: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (!user) return navigate('/');
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