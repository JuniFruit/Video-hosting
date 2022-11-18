import { Layout } from '../../layout/Layout';
import { FC } from "react";
import { Discover } from "./discover/Discover";
import NewVideos from './new-videos/NewVideos';

const Home: FC = () => {    

    return <Layout title="MeTube - New broadcasting service">
        <Discover />
        <NewVideos />
    </Layout>

}


export default Home