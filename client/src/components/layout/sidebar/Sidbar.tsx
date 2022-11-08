import { FC } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import { Logo } from "../../ui/logo/Logo";
import { Menu } from "./menu/Menu";
import { MenuArr } from "./menu/menu.data";
import styles from './Sidebar.module.scss';


export const Sidebar: FC = () => {

    const { user } = useAuth();
    const { data } = api.useGetProfileQuery(2, {
        skip: !user
    })


    return <aside className={styles.sidebar}>
        <Logo />
        <Menu title="Menu" items={MenuArr} />
        {user && !!data?.subscriptions.length &&
            <Menu title="My subscriptions" items={data?.subscriptions.map(sub => ({
                image: sub.toUser.avatarPath,
                link: `/channel/${sub.toUser.id}`,
                title: sub.toUser.name
            })) || []} />
        }
    </aside>
}