import { FC, useEffect, useState } from "react";
import { VideoService } from "../../../../services/video/video.service";
import { IVideo } from "../../../../types/video.interface";
import { Heading } from "../../../ui/heading/Heading";
import { VideoItem } from "../../../ui/video-item/VideoItem";
import styles from './Catalog.module.scss';

export const Catalog: FC<{userVideos:IVideo[] | null, title:string}> = ({ userVideos, title }) => {
    const [videos, setVideos] = useState<IVideo[] | null>(null);


    useEffect(() => {
        if (!userVideos) {
            VideoService.getAll()
                .then(data => setVideos(data))
        } else {
            setVideos(userVideos)
        }
       
    }, [userVideos]);

    return (
        <div className={styles.videos_wrapper}>
            <Heading title={title} />
            <div className={styles.videos_block}>
                {videos?.length 
                    ? videos.map(item => {
                        return <VideoItem item={item} isSmall={false} key={item.id} />
                    })
                    : null
                }
            </div>
        </div>
    )

}