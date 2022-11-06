import { FC } from "react"
import { millisToMinutesAndSeconds } from "../../../utils/format.utils";
import { IDuration } from "./VideoItem.interface";
import styles from './VideoItem.module.scss';


export const VideoDuration: FC<IDuration> = ({duration, position = 'bot-r'}) => {

    return (
        <div className={`${styles.duration} ${styles[position]}`}>
            <time>{millisToMinutesAndSeconds(duration)}</time>
        </div>
    )
}