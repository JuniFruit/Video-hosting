import { FC } from "react";
import { IUploadVideoInfo } from "./UploadVideoInfo.interface";
import styles from './UploadVideoInfo.module.scss';

export const UploadVideoInfo: FC<IUploadVideoInfo> = ({thumbnailPath}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.img_container}>
                <img 
                    src={'/files' + thumbnailPath}
                    alt='Video thumbnail'
                />
            </div>            
        </div>
    )
}