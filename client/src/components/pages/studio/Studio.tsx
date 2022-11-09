import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../store/api/api';
import { videoApi } from '../../../store/api/video.api';
import { Layout } from '../../layout/Layout';
import { Catalog } from '../home/catalog/Catalog';

export const Studio: FC = () => {
    const { isLoading, user } = useAuth();

    const navigate = useNavigate();
    const { data: profile } = api.useGetProfileQuery(user?.id!, {
        skip: !user
    })
    const [deleteVideo] = videoApi.useDeleteMutation()

    useEffect(() => {
        if (isLoading) return;
        if (!user) {
            navigate('/')
        };
    }, [user, isLoading])

    const videos = profile?.videos;

    return (

        <Layout title='MeTube studio'>
            <Catalog
                videosToRender={videos || []}
                title='My videos'
                removeHandler={deleteVideo}
            />
        </Layout>
    )
}