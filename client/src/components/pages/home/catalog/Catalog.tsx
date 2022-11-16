import { FC, useEffect, useState } from "react";
import { VideoService } from "../../../../services/video/video.service";
import { IVideo } from "../../../../types/video.interface";
import { Heading } from "../../../ui/heading/Heading";
import { VideoItem } from "../../../ui/video-item/VideoItem";
import styles from './Catalog.module.scss';

interface ICatalog {
    title: string;
    videosToRender: IVideo[] | null;
    removeHandler?: (videoId:number) => void;
    updateHandler?: (videoId: number) => void;
}

export const Catalog: FC<ICatalog> = ({ videosToRender, title, removeHandler, updateHandler }) => {
    const [videos, setVideos] = useState<IVideo[] | null>(null);

    useEffect(() => {
        if (!videosToRender) {
            VideoService.getAll()
                .then(data => setVideos(data))
        } else {
            setVideos(videosToRender)
        }

    }, [videosToRender]);

    return (
        <div className={styles.videos_wrapper}>
            <Heading title={title} />
            <div className={styles.videos_block}>
                {videos?.length
                    ? videos.map(item => {
                        return <VideoItem
                            item={item}
                            removeHandler={removeHandler}
                            updateHandler={updateHandler}
                            isSmall={false}
                            key={item.id}
                        />
                    })
                    : 
                    <div className={styles.not_found}> 
                        No videos here
                    </div>
                }
            </div>
        </div>
    )

}