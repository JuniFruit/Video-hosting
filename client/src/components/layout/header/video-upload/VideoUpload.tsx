import { FC, useState } from "react";
import { HiUpload } from "react-icons/hi";
import { videoApi } from "../../../../store/api/video.api";
import styles from './VideoUpload.module.scss';


export const VideoUpload: FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [videoId, setVideoId] = useState<number>(0)

    const [createVideo, { isLoading }] = videoApi.useCreateMutation()


    return (
        <>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    createVideo().unwrap().then(id => {
                        setVideoId(id);
                        setIsOpen(true);
                    })
                }
                }
                className={styles.button}
            >
                <HiUpload />
            </button>
        </>
    )
}