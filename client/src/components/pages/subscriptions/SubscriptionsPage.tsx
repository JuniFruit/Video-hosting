import { FC } from 'react';
import { useAuth } from "../../../hooks/useAuth"
import { api } from "../../../store/api/api"
import { Layout } from '../../layout/Layout';
import { Menu } from '../../layout/sidebar/menu/Menu';


export const SubscriptionsPage: FC = () => {

    const { user } = useAuth()
    const { data: profile } = api.useGetProfileQuery(user?.id!, {
        skip: !user
    })


    return (
        <Layout title='My subscriptions'>

            {profile?.subscriptions.length &&
                < Menu title="My subscriptions" items={profile?.subscriptions.map(sub => ({
                    image: sub.toUser.avatarPath,
                    link: `/channel/${sub.toUser.id}`,
                    title: sub.toUser.name
                })) || []} />
            }

        </Layout>
    )
}