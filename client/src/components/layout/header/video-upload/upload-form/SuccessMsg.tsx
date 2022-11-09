import { FC } from "react"
import styles from './UploadForm.module.scss';

export const SuccessMsg:FC = () => {

    return (
        <div className={styles.success}>
            Video uploaded successfully
        </div>
    )
}