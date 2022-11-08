import { FC } from "react";
import { useSearch } from "../../../../hooks/useSearch";
import Field from "../../../ui/fields/Fields";
import { VideoItem } from "../../../ui/video-item/VideoItem";
import { IoSearchOutline } from 'react-icons/io5';
import styles from './Search.module.scss';
import { useClickOutside } from "../../../../hooks/useClickOutside";


export const Search: FC = () => {

    const { handleSearch, data, isSuccess, searchTerm } = useSearch();
    const {ref, isShow} = useClickOutside(true);

    return (
        <div className={styles.search_wrapper} ref={ref}>
            <label>
                <Field
                    onChange={handleSearch}                    
                    value={searchTerm}
                    placeholder={'Search videos'}
                />
                <IoSearchOutline />
            </label>
            {isSuccess && isShow
                ?
                <div  className={styles.search_results}>

                    {data?.length
                        ?
                        data.map(item => {
                            return <VideoItem item={item} isSmall={true} key={item.id} />
                        })
                        :
                        <div className={styles.search_no_vids}> No results </div>
                    }
                </div>
                :
                null
            }

        </div>
    )
}