import { useParams } from "react-router-dom";
import { videoApi } from "../../../store/api/video.api";
import { IVideo } from "../../../types/video.interface";
import { Layout } from "../../layout/Layout"
import { Comments } from "./comments/Comments";
import { VideoPlayer } from "./video-player/VideoPlayer";
import styles from './Video.module.scss';

export const Video = () => {

    const {id} = useParams();

    const {data:video = {} as IVideo} = videoApi.useGetByIdQuery(Number(id), {
        skip: !id
    })


    return (
        <Layout title={video.name}>
            <div className={styles.layout}>
                <VideoPlayer videoPath={video.videoPath} />
                <Comments videoId={video.id} comments={video.comments || {}} />
            </div>
            <div className={`${styles.layout} ${'mt-7'}`}>
                
            </div>

        </Layout>
    )
}