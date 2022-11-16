import { Layout } from '../../layout/Layout';
import { FC } from "react";
import { Catalog } from "./catalog/Catalog";
import { Discover } from "./discover/Discover";
import { useActions } from '../../../hooks/useActions';
import { VideoService } from '../../../services/video/video.service';
import { useQuery } from 'react-query';


const Home: FC = () => {
    const { addMsg } = useActions()

    const {
        data: videos,
        isError,
        isSuccess,
        isLoading,
        error } = useQuery('Videos_query', VideoService.getAll)

    if (isError) addMsg({ message: error, status: 500 });

    return <Layout title="MeTube - New broadcasting service">
        <Discover />
        <Catalog
            videosToRender={videos || []}
            title='New videos'
            isLoading={isLoading}
        />
    </Layout>

}


export default Home