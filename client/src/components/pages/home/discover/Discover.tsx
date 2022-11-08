import { FC, useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";

import { VideoService } from "../../../../services/video/video.service";
import { IVideo } from "../../../../types/video.interface";
import { randomize } from "../../../../utils/generalUtils";
import { LargeVideo } from "../../../ui/video-item/LargeVideo";
import styles from './Discover.module.scss';

export const Discover: FC = () => {
    const [topVideo, setTopVideo] = useState<IVideo | null>(null);
    const [randomVideo, setRandomVideo] = useState<IVideo | null>(null);

    
    useEffect(() => {
        VideoService.getMostViewed()
            .then(data => {
                const filtered = data.filter(video => video.id !== data[0].id);
                setTopVideo(data[0]);
                setRandomVideo(filtered[randomize(filtered.length)]);
            })


    }, [])

    if (!topVideo || !randomVideo) return null;

    return (

        <section className={styles.wrapper}>
            <div className={styles.video_wrapper}>
                <div className={styles.top_video}>
                    <LargeVideo {...topVideo} />
                </div>
                <div className={styles.random_video}>
                    <LargeVideo  {...randomVideo} />
                </div>

            </div>
        </section>
    )
}