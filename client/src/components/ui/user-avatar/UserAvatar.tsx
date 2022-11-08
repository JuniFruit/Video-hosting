import { FC } from "react";
import { mockups } from "../../../assets/mockups/images";
import { UserCheckMark } from "./UserCheckMark";
import styles from './UserAvatar.module.scss';
import { IUserAvatar } from "./UserAvatar.interface";
import { Link } from "react-router-dom";

export const UserAvatar: FC<IUserAvatar> = ({ avatarPath, isVerified,id }) => {

    return (
        <Link to={`/channel/${id}`}>

            <div className={styles.avatar_wrapper}>
                <div className={styles.avatar}>
                    <img
                        src={`${avatarPath || mockups.defaultAvatar}`}

                    />
                </div>
                <div className={styles.avatar_check}>
                    {isVerified && <UserCheckMark />}
                </div>
            </div>
        </Link>
    )
}