import { FC, useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useIsMobile } from "../../../../hooks/useMobile";

import { VideoService } from "../../../../services/video/video.service";
import { IVideo } from "../../../../types/video.interface";
import { randomize } from "../../../../utils/generalUtils";
import { LargeVideo } from "../../../ui/video-item/LargeVideo";
import styles from './Discover.module.scss';

export const Discover: FC = () => {
    const [topVideo, setTopVideo] = useState<IVideo | null>(null);
    const [randomVideo, setRandomVideo] = useState<IVideo | null>(null);
    const {isMobile} = useIsMobile();

    useEffect(() => {
        VideoService.getMostViewed()
            .then(data => {
                setTopVideo(data[0]);

                const filtered = data.filter(video => video.id !== data[0].id);
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
                {!isMobile && <div className={styles.random_video}>
                    <LargeVideo  {...randomVideo} />
                </div>}

            </div>
        </section>
    )
}