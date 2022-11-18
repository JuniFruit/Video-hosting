import { FC, memo } from "react";
import { IVideoItem } from "./VideoItem.interface";
import { VideoManipulations } from "./VideoManipulations";
import { VideoStats } from "./VideoStats";
import styles from './VideoItem.module.scss';
import { UserAvatar } from "../user-avatar/UserAvatar";
import { truncTitle } from "../../../utils/format.utils";
import { VideoDuration } from "./VideoDuration";
import { Link } from "react-router-dom";


export const VideoItem: FC<IVideoItem> = memo(({ removeHandler, item, isSmall, updateHandler }) => {


    return (
        <div className="relative">
            <div className={`${styles.small_wrapper} ${isSmall ? styles.search_results : ''}`}>
                <Link to={`/videos/${item.name || 'default'}/${item.id}`}>

                    <img
                        src={item.thumbnailPath}
                        alt={item.name}
                    />

                    <VideoDuration duration={item.duration} position={'top-r'} />
                    <div className={styles.small_content}>

                        {!isSmall ?
                            <>
                                <span className={styles.span}>{item.user?.name || 'No name'}</span>
                                <h3 title={item.name}>{truncTitle(item.name, 100)}</h3>

                            </>
                            :
                            <h3 title={item.name}>{truncTitle(item.name, 10)}</h3>
                        }

                        <VideoStats
                            createdAt={item.createdAt}
                            views={item.views}
                            isSmall={isSmall}
                        />


                    </div>
                    <div className={styles.small_avatar}>
                        <UserAvatar
                            avatarPath={item.user?.avatarPath}
                            isVerified={item.user?.isVerified}
                            id={item.user?.id}
                        />
                    </div>
                </Link>
                {!!removeHandler && <VideoManipulations {...{ removeHandler, id: item.id, updateHandler }} />}
            </div>
        </div>
    )
})