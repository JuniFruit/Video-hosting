import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../../hooks/useSearch";
import { videoApi } from "../../../store/api/video.api";
import { Layout } from "../../layout/Layout";
import { Catalog } from "../home/catalog/Catalog";


const SearchResult: FC = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q')

    const {isSuccess, data} = videoApi.useGetBySearchTermQuery(searchTerm!, {
        skip: !searchTerm,
        selectFromResult: ({data, ...rest}) => ({
           data: data?.slice(0, 25),
           ...rest
        })
    });

    return (
        <Layout title="MeTube search">
            <Catalog 
                videosToRender={data || []}
                title={`Results for ${searchTerm}`}
            />
        </Layout>
    )
}

export default SearchResult;