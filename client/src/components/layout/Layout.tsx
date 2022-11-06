
import { FC, PropsWithChildren } from "react";
import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidbar";
import styles from './Layout.module.scss';
import { setTabTitle } from "../../utils/generalUtils";
import { InfoPop } from "../ui/info-pop/InfoPop";


export const Layout:FC<PropsWithChildren<{title:string}>> = ({title, children}) => {
    setTabTitle(title);
   
    return (
        <>            
            <main className={styles.main}>
                <InfoPop />
                <Sidebar />
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