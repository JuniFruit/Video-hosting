import { FC } from "react"
import { Link } from "react-router-dom";
import { mockups } from "../../../assets/mockups/images";
import { IVideo } from "../../../types/video.interface"
import { UserAvatar } from "../user-avatar/UserAvatar";
import { VideoDuration } from "./VideoDuration";
import styles from './VideoItem.module.scss';
import { VideoStats } from "./VideoStats";
export const LargeVideo: FC<IVideo> = ({ views, duration, name, user, thumbnailPath, createdAt, id }) => {

    return (
        <div className={styles.large_wrapper}>
            <Link to={`/videos/${name}/${id}`}>
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
                        <UserAvatar
                            avatarPath={user.avatarPath}
                            id={user.id}
                            isVerified={user.isVerified}
                        />
                        <div>
                            <span>{user.name || 'Test'}</span>
                            <VideoStats
                                createdAt={createdAt}
                                views={views}
                                isSmall={false}
                            />
                        </div>
                    </div>

                </div>
            </Link>
            <VideoDuration duration={duration} />
        </div>
    )
}