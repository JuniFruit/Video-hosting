import { FC } from "react";
import { Link } from "react-router-dom";
import { mockups } from "../../../../../assets/mockups/images";
import { useActions } from "../../../../../hooks/useActions";
import { useAuth } from "../../../../../hooks/useAuth";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import {IoChevronUp, IoChevronDown} from 'react-icons/io5'
import { api } from "../../../../../store/api/api";
import styles from './ProfileMenu.module.scss';

export const ProfileMenu: FC = () => {

    const { user } = useAuth();

    const { isLoading, data } = api.useGetProfileQuery(user!.id, {
        skip: !user
    });
    const {logout} = useActions()
    const {ref, isShow, setIsShow} = useClickOutside(false);

    if (isLoading) return null;

    return (
        <div ref={ref} className={styles.wrapper}>
            
            <button onClick={(e) => {e.preventDefault(); setIsShow(!isShow)}}>
                <img 
                    src={data?.avatarPath || mockups.defaultAvatar}
                    alt={data?.name || 'user avatar'}
                    className='w-9 h-9 rounded-lg' 
                />
                <span>
                    {data?.name || ''}
                </span>
                {isShow ? <IoChevronUp className={styles.icon} /> : <IoChevronDown className={styles.icon} />}
            </button>
            { isShow 
                ?
                <div className={styles.menu}> 
                    <ul>
                        <li>
                            <Link to={`/channel/${user?.id}`}>My Channel</Link>
                        </li>
                        <li>
                            <Link to={`/studio`}>Studio</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
                :
                null
            }
        </div>
    )
}