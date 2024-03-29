import { FC } from "react";
import { IoIosLeaf } from 'react-icons/io';
import { setTabTitle } from "../../../utils/generalUtils";
import styles from './NotFound.module.scss';

const NotFoundPage: FC = () => {
    setTabTitle("Not Found")
    return (
        <div className={styles.wrapper}>
            <h2>Sorry. Such page doesn't exist</h2>
            <IoIosLeaf />
        </div>
    )
}

export default NotFoundPage;