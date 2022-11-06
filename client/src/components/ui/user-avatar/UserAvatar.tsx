import { FC } from "react";
import { mockups } from "../../../assets/mockups/images";
import { UserCheckMark } from "./UserCheckMark";
import styles from './UserAvatar.module.scss';

export const UserAvatar: FC = () => {

    return (
        <div className={styles.avatar_wrapper}>
            <div className={styles.avatar}>
                <img
                    src={`${mockups.defaultAvatar}`}
                    
                />
            </div>
            <div className={styles.avatar_check}>
                <UserCheckMark />
            </div>
        </div>
    )
}