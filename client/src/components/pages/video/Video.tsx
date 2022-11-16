import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../../hooks/useMobile";
import { videoApi } from "../../../store/api/video.api";
import { IVideo } from "../../../types/video.interface";
import { Layout } from "../../layout/Layout"
import { Comments } from "./comments/Comments";
import { VideoDetails } from "./video-details/VideoDetails";
import { VideoPlayer } from "./video-player/VideoPlayer";
import styles from './Video.module.scss';

export const Video: FC = () => {

    const { id } = useParams();
    const {isMobile, isLaptopSmall} = useIsMobile();
    const { data: video = {} as IVideo } = videoApi.useGetByIdQuery(Number(id), {
        skip: !id
    })

    const [incrementViews] = videoApi.useIncrementViewsMutation();

    useEffect(() => {

        if (video.id) incrementViews(video.id);

    }, [video.id])


    return (
        <Layout title={video.name}>
            <div className={styles.layout}>
                <VideoPlayer videoPath={video.videoPath} thumbnailPath={video.thumbnailPath} />
                {
                    !isMobile ?
                        <Comments videoId={video.id} comments={video.comments || {}} />
                        :
                        <VideoDetails {...video} />
                        
                }
            </div>
            <div className={`${styles.layout} ${'mt-7'}`}>
                {isMobile ?
                    <Comments videoId={video.id} comments={video.comments || {}} />
                    :
                    <VideoDetails {...video} />
                }
                <div></div>
            </div>

        </Layout>
    )
}