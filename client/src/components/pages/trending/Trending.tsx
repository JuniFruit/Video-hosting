import { FC, useState, useEffect } from 'react';
import { VideoService } from '../../../services/video/video.service';
import { IVideo } from '../../../types/video.interface';
import { Layout } from '../../layout/Layout';
import { Catalog } from '../home/catalog/Catalog';

export const Trending: FC = () => {

    const [videos, setVideos] = useState<IVideo[] | []>([]);

    useEffect(() => {
        VideoService.getMostViewed()
            .then(data => setVideos(data))

    }, [])


    return (
        <Layout title='Trending videos'>
            <Catalog title='Trending' videosToRender={videos} />
        </Layout>
    )
}