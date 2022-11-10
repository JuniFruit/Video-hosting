import { FC } from "react";
import { IUploadField } from "./UploadField.interface";
import { useUpload } from "./useUpload";
import styles from './UploadField.module.scss';

export const UploadField: FC<IUploadField> = ({title, onChange, onChooseFile, setValue, folder}) => {

    const {uploadFile} = useUpload(onChange, setValue, folder, onChooseFile);

    return (
        <div className={styles.file}>
            {title && <h2>{title}</h2>}
            <label>
                <span className="sr-only">Choose a file</span>
                <input type='file' onChange={uploadFile}/>
            </label>
        </div>

    )
}