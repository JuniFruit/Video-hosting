import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../../hooks/useMobile";
import { videoApi } from "../../../store/api/video.api";
import { IVideo } from "../../../types/video.interface";
import { setTabTitle } from "../../../utils/generalUtils";
import { Comments, VideoLayoutMobile } from "../../ui/SuspenseWrapper";
import { VideoDetails } from "../../ui/video-item/suspense/VideoSuspense";
import { VideoPlayer } from "./video-player/VideoPlayer";
import styles from './Video.module.scss';

const Video: FC = () => {
    const { id } = useParams();
    const { isLaptopSmall } = useIsMobile();
    const { data: video = {} as IVideo } = videoApi.useGetByIdQuery(Number(id), {
        skip: !id
    })

    const [incrementViews] = videoApi.useIncrementViewsMutation();

    setTabTitle(`${video.name || 'Watch'}`)

    useEffect(() => {

        if (video.id) incrementViews(video.id);
        window.scrollTo(0,0)

    }, [video.id])

    return (
        <>
            {isLaptopSmall
                ?
                <VideoLayoutMobile video={video} />
                :
                <div className={styles.layout}>
                    <div>
                        <VideoPlayer videoPath={video.videoPath} thumbnailPath={video.thumbnailPath} />
                        <VideoDetails {...video} />
                    </div>
                    <Comments videoId={video.id} comments={video.comments || {}} />


                </div>
            }
        </>

    )
}

export default Video