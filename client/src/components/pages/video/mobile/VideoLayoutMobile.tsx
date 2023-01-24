import { FC } from "react";
import { Comments } from "../../../ui/SuspenseWrapper";
import { VideoDetails } from "../../../ui/video-item/suspense/VideoSuspense";
import { VideoPlayer } from "../video-player/VideoPlayer";
import styles from '../Video.module.scss';
import { IVideoInfoMobile } from "./VideoLayoutMobile.interface";



const VideoLayoutMobile: FC<IVideoInfoMobile> = ({ video }) => {

    return (
        <div className={styles.mobile_layout}>
            <div className={styles.video_container}>
                <VideoPlayer videoPath={video.videoPath} thumbnailPath={video.thumbnailPath} />
            </div>
            <div className={styles.video_bottom}>
                <VideoDetails {...video} />
                <Comments videoId={video.id} comments={video.comments || {}} />
            </div>
        </div>
    )
}

export default VideoLayoutMobile;