import { FC, useState } from "react";
import { HiUpload } from "react-icons/hi";
import { useAuth } from "../../../../hooks/useAuth";
import { videoApi } from "../../../../store/api/video.api";
import { UploadModal } from "./UploadModal";
import styles from './VideoUpload.module.scss';


export const VideoUpload: FC = () => {

    const [isOpen, setIsOpen] = useState(false);
   
    return (
        <>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                }}
                
              
                className={styles.button}
            >
                <HiUpload />
            </button>
            <UploadModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}