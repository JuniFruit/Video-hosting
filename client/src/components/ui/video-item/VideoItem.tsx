import { FC } from "react";
import { mockups } from "../../../assets/mockups/images";
import { IVideoItem } from "./VideoItem.interface";
import { VideoManipulations } from "./VideoManipulations";
import { VideoStats } from "./VideoStats";
import styles from './VideoItem.module.scss';
import { UserAvatar } from "../user-avatar/UserAvatar";
import { truncTitle } from "../../../utils/format.utils";
import { VideoDuration } from "./VideoDuration";


export const VideoItem: FC<IVideoItem> = ({ removeHandler, item, isSmall, isUpdateLink }) => {
    return (
        <div className={styles.small_wrapper}>
            <img
                src={mockups.designMain}
                alt={item.name}
            />
            <VideoDuration duration={item.duration} position={'top-r'}/>
            <div className={styles.small_content}>
                <span className={styles.span}>{item.user.name || 'No name'}</span>
                <h3>{truncTitle(item.name, 100)}</h3>
                <VideoStats createdAt={item.createdAt} views={item.views} />

            </div>
            <div className={styles.small_avatar}>
                <UserAvatar />
            </div>
            
            <VideoManipulations />
        </div>
    )
}