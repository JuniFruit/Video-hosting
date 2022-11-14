import dayjs from "dayjs";
import { FC } from "react";
import { HiCalendar } from "react-icons/hi";
import { IoEyeSharp } from "react-icons/io5";
import { RiHeart2Fill } from 'react-icons/ri';
import { IVideo } from "../../../../types/video.interface";
import { formatToKilo } from "../../../../utils/format.utils";
import LikeVideoButton from "../../../ui/like-button/LikeVideoButton";
import { ShortInfo } from "../../../ui/short-info/ShortInfo";
import { Subscribe } from "../../../ui/subscribe-button/Subscribe";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import styles from './VideoDetails.module.scss';


export const VideoDetails: FC<IVideo> = (video) => {

    if (!Object.keys(video).length) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                {video.user && <ShortInfo channel={video.user} />}
                <h2>{video.name}</h2>
                <p>{video.description}</p>
            </div>
            <div className={styles.stats}>
                <div className={styles.buttons}>
                   {video.user && <Subscribe channelIdToSub={video.user.id} />}
                    <LikeVideoButton videoId={video.id} />
                </div>
                <div className={styles.video_perfomance}>
                    <div>
                        <IoEyeSharp />
                        <span>{formatToKilo(video.views)} views</span>
                    </div>
                    <div>
                        <RiHeart2Fill />
                        <span>{formatToKilo(video.likes)} likes</span>
                    </div>
                    <div>
                        <HiOutlineChatBubbleOvalLeftEllipsis />
                        <span>{formatToKilo(video.commentsCount)} comments</span>
                    </div>
                    <div>
                        <HiCalendar />
                        <span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
                    </div>
                </div>


            </div>


        </div>
    )
}