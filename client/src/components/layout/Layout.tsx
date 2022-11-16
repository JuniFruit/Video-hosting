
import { FC, PropsWithChildren } from "react";
import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidbar";
import styles from './Layout.module.scss';
import { setTabTitle } from "../../utils/generalUtils";
import { InfoPop } from "../ui/info-pop/InfoPop";
import { useIsMobile } from "../../hooks/useMobile";


export const Layout:FC<PropsWithChildren<{title:string}>> = ({title, children}) => {
    setTabTitle(title);
    const {isMobile} = useIsMobile();
    return (
        <>            
            <main className={styles.main}>
                <InfoPop />
                {!isMobile ? <Sidebar /> : null}

                <section className={styles.content}>
                    <Header />
                    <div className={styles.wrapper}>
                        {children}
                    </div>
                </section>
            </main>
        </>
    )
}