import { FC } from "react";
import { Layout } from "../../layout/Layout";
import {IoIosLeaf} from 'react-icons/io';
import styles from './NotFound.module.scss';

 const NotFoundPage: FC = () => {

    return (

        <Layout title="MeTube 404">
            <div className={styles.wrapper}>
                <h2>Sorry. Such page doesn't exist</h2>
                <IoIosLeaf />
            </div>
        </Layout>
    )
}

export default NotFoundPage;