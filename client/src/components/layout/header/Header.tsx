import { FC } from "react";
import styles from './Header.module.scss';
import { RightElements } from "./right-elements/RightElements";
import { Search } from "./search-bar/Search";

export const Header: FC = () => {
    return <header className={styles.header}>
        <Search />
        <RightElements />
    </header>
}