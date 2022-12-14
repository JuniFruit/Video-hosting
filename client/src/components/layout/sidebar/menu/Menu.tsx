import { FC, memo } from "react";
import { Line } from "../../../ui/misc/Line";
import { IMenuItem } from "./Menu.interface";

import styles from './Menu.module.scss';
import { MenuItem } from "./MenuItem";

export const Menu: FC<{ title: string, items: IMenuItem[] }> = memo(({ title, items }) => {
    return <nav className={styles.menu_sidebar}>
        <h3>{title}</h3>
        <ul>
            {items.map((menuItem: IMenuItem) => (
                <MenuItem item={menuItem} key={menuItem.link} />
            ))
            }

        </ul>
        <Line />
    </nav>
}, (prev, next) => prev.items.length == next.items.length)