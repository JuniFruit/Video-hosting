import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
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
    const {addMsg} = useActions()
    
    console.log(profile)
    const handleDelete = (id:number) => {
  
        deleteVideo(id).unwrap().then(() => addMsg({message: 'Video was deleted', status: 200}));
    }

    const handleUpdate = (id:number) => {
        navigate(`/studio/edit/video/${id}`)
    }
    
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
                removeHandler={handleDelete}
                updateHandler={handleUpdate}
            />
        </Layout>
    )
}