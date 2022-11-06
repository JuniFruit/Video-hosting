import { FC } from "react"
import { mockups } from "../../../assets/mockups/images";
import { IVideo } from "../../../types/video.interface"
import { UserAvatar } from "../user-avatar/UserAvatar";
import { VideoDuration } from "./VideoDuration";
import styles from './VideoItem.module.scss';
import { VideoStats } from "./VideoStats";
export const LargeVideo: FC<IVideo> = ({ views, duration, name, user, thumbnailPath, createdAt }) => {
  
    return (
        <div className={styles.large_wrapper}>
            <img
                src={mockups.designMain}
                className={styles.large_thumbnail}
                alt={name}

            />
            <div className={styles.large_content}>
                <div className={styles.large_name}>
                    <h3>Publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </h3>
                </div>
                <div className={styles.large_stats_wrapper}>
                    <UserAvatar />
                    <div>
                        <span>{user.name || 'Test'}</span>
                        <VideoStats createdAt={createdAt} views={views} />
                    </div>
                </div>

            </div>
            <VideoDuration duration={duration}/>
        </div>
    )
}