import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../store/api/api';
import { videoApi } from '../../../store/api/video.api';
import { Layout } from '../../layout/Layout';
import { Catalog } from '../home/catalog/Catalog';

const Studio: FC = () => {
    const { isLoading, user } = useAuth();

    const navigate = useNavigate();
    const { videos } = api.useGetProfileQuery(user?.id!, {
        skip: !user,
        selectFromResult: ({data}) => ({
            videos: data?.videos
        })
    })
    const [deleteVideo] = videoApi.useDeleteMutation()
    const {addMsg} = useActions()
    
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

    return (

        <Layout title='MeTube studio'>
            <Catalog
                videosToRender={videos || []}
                title='My videos'
                removeHandler={handleDelete}
                updateHandler={handleUpdate}
                isLoading={isLoading}
            />
        </Layout>
    )
}

export default Studio;