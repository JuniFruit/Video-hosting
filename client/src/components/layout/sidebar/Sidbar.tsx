import { FC } from "react";
import { Link } from "react-router-dom";
import { Menu } from "./menu/Menu";
import { MenuArr } from "./menu/menu.data";
import styles from './Sidebar.module.scss';


export const Sidebar: FC = () => {
    return <aside className={styles.sidebar}>
        <Link to={'/'} className={styles.logo}>
            MeTube 
        </Link>
        <Menu title="Menu" items={MenuArr} />
    </aside>
}