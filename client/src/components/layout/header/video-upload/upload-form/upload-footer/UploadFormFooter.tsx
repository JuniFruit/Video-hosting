import { FC } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Button } from "../../../../../ui/button/Button";
import { IUploadFormFooter } from "./UploadFormFooter.interface";
import styles from './UploadFormFooter.module.scss';


export const UploadFormFooter: FC<IUploadFormFooter> = ({ progress, isUploaded, isEdit, onCloseUnfinished, isProcessing }) => {

    const handleOnClick = () => {
        if (!isEdit) {
            if (!isUploaded || isProcessing) return onCloseUnfinished()
        }
    }

    return (
        <div className={styles.wrapper}>
            {!isEdit && <div className={styles.progress}>
                {isUploaded && !isProcessing ? <IoCheckmarkCircle /> : null}
                {!isUploaded ? `Video is uploading ${progress}%` : ''}
                {isProcessing ? 'Video is processing. Please wait...' : ''}
                {isUploaded && !isProcessing ? 'Video is ready!' : ''}
            </div>}
            <Button
                onClick={() => handleOnClick()}
            >Save
            </Button>
        </div>
    )
}