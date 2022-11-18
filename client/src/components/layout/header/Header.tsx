import { FC, memo } from "react";
import { useDetectScrollDirection } from "../../../hooks/useDetectScrollDirection";
import { useIsMobile } from "../../../hooks/useMobile";
import styles from './Header.module.scss';
import { MobileMenu } from "./left-elements-mobile/MobileMenu";
import { RightElements } from "./right-elements/RightElements";
import { Search } from "./search-bar/Search";

export const Header: FC = memo(() => {
    const {isMobile} = useIsMobile();
    const isScrollDown = useDetectScrollDirection();
    return <header className={`${styles.header} ${(isMobile && isScrollDown) ? styles.header_out  : ''}`}>
        {isMobile && <MobileMenu />}
        {!isMobile && <Search />}
        <RightElements />
    </header>
})