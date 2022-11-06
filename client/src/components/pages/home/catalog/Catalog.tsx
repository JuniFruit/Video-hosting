import { FC, useEffect, useState } from "react";
import { VideoService } from "../../../../services/video/video.service";
import { IVideo } from "../../../../types/video.interface";
import { Heading } from "../../../ui/heading/Heading";
import { VideoItem } from "../../../ui/video-item/VideoItem";
import styles from './Catalog.module.scss';

export const Catalog: FC = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);


    useEffect(() => {
        VideoService.getAll()
            .then(data => setVideos(data))
    }, []);



    return (
        <div className={styles.videos_wrapper}>
            <Heading title={`New Videos`} />
            <div className={styles.videos_block}>
                {videos.length
                    ? videos.map(item => {
                        return <VideoItem item={item} key={item.id} />
                    })
                    : null}
            </div>
        </div>
    )

}