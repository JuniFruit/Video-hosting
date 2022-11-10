import { FC } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Button } from "../../../../../ui/button/Button";
import { IUploadFormFooter } from "./UploadFormFooter.interface";
import styles from './UploadFormFooter.module.scss';
export const UploadFormFooter: FC<IUploadFormFooter> =({progress, isUploaded}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.progress}>
                {isUploaded && <IoCheckmarkCircle />}
                {!isUploaded ? `Video is uploading ${progress}%` : 'Video is uploaded'}
            </div>
            <Button>Save</Button>
        </div>
    )
}