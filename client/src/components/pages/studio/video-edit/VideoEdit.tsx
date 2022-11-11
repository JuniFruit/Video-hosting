import { FC } from "react";
import { useParams } from "react-router-dom";
import { UploadForm } from "../../../layout/header/video-upload/upload-form/UploadForm";
import { Layout } from "../../../layout/Layout";
import styles from './VideoEdit.module.scss';

const VideoEdit: FC = () => {

    const { id } = useParams();

    return (
        <Layout title={`MeTube editing page`}>
            <div className={styles.edit_wrapper}>

                <UploadForm
                    videoId={Number(id)}
                    handleCloseModal={() => {return}}
                    isEdit={true}
                />
            </div>
        </Layout>
    )
}

export default VideoEdit