import { FC } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { IMenuItem } from "./Menu.interface";
import { Link, useLocation } from "react-router-dom";
import styles from './Menu.module.scss';

export const MenuItem: FC<{item: IMenuItem}> = ({item}) => {
    const {user} = useAuth();
    const location = useLocation();
    if (item.link === '/my-channel') {
        if (!user) return null
        item.link = `/channel/${user?.id}`
    }



    return <li>
        <Link to={item.link} className={item.link === location.pathname ? styles.active : ''}>
            <span className={item.image ? styles.image : ''}>
                {item.icon && <item.icon />}
                {item.image && <img src={item.image} alt={item.title} width={40} height={40} />}
            </span>
            <p>{item.title}</p>
        </Link>

    </li>
}