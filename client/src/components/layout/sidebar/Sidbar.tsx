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

    const subsToRender = data?.subscriptions.slice(0, 10);

    return <aside className={styles.sidebar}>
        <Logo />
        <Menu title="Menu" items={MenuArr} />
        {user && !!subsToRender?.length &&
            <Menu title="My subscriptions" items={subsToRender.map(sub => ({
                image: sub.toUser.avatarPath,
                link: `/channel/${sub.toUser.id}`,
                title: sub.toUser.name
            })) || []} />
        }
    </aside>
}