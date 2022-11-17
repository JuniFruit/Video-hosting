import { AxiosError } from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useActions } from '../../../hooks/useActions';
import { VideoService } from '../../../services/video/video.service';
import { IVideo } from '../../../types/video.interface';
import { Layout } from '../../layout/Layout';
import { Catalog } from '../home/catalog/Catalog';

const Trending: FC = () => {

    const { addMsg } = useActions();

    const {
        error,
        isLoading,
        isError,
        data: videos
    } = useQuery<IVideo[], AxiosError>('Videos_query', VideoService.getMostViewed);

    if (isError) addMsg({ message: error.message, status: 500 });


    return (
        <Layout title='Trending videos'>
            <Catalog
                title='Trending'
                videosToRender={videos || []}
                isLoading={isLoading}
            />
        </Layout>
    )
}

export default Trending