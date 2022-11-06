import dayjs from "dayjs";
import { FC } from "react"
import { formatToKilo } from "../../../utils/format.utils"
import styles from './VideoItem.module.scss';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const VideoStats: FC<{ createdAt: string, views: number }> = ({ createdAt, views }) => {

    return (
        <div className={styles.stats}>

            <div className={styles.views}>
                {formatToKilo(views)} views
            </div>
            {!!createdAt &&
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