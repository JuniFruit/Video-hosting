import { FC } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { IManipulation } from "./VideoItem.interface";
import styles from './VideoItem.module.scss';


export const VideoManipulations: FC<IManipulation> = ({removeHandler, isUpdateLink, ...rest}) => {

    return (
        <div className={styles.manipulations}>
            <button onClick={() => removeHandler}>
                <HiTrash />
            </button>
            <button >
                <HiPencil />
            </button>
        </div>

    )
}