import dayjs from "dayjs";
import { FC } from "react"
import { formatToKilo } from "../../../utils/format.utils"
import styles from './VideoItem.module.scss';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IVideoStats } from "./VideoItem.interface";

dayjs.extend(relativeTime);

const VideoStats: FC<IVideoStats> = ({ createdAt, views, isSmall }) => {
    return (
        <div className={styles.stats}>

            <div className={styles.views}>
                {formatToKilo(views)} views
            </div>
            {isSmall == false &&
                <>
                    <div className="mx-2">•</div>
                    <span className={styles.date}>
                        {dayjs(new Date(createdAt)).fromNow()}
                    </span>

                </>                
            }


        </div>
    )
}

export default VideoStats