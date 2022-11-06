import { Layout } from '../../layout/Layout';
import { FC } from "react";
import { Catalog } from "./catalog/Catalog";
import { Discover } from "./discover/Discover";


export const Home: FC = () => {
    return <Layout title="MeTube - New broadcasting service">
            Home
            <Discover />
            <Catalog />
        </Layout>
    
}