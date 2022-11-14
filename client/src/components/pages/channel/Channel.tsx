import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../types/user.interface';
import { IVideo } from '../../../types/video.interface';
import { Layout } from '../../layout/Layout';
import { ShortInfo } from '../../ui/short-info/ShortInfo';
import { Subscribe } from '../../ui/subscribe-button/Subscribe';
import { Catalog } from '../home/catalog/Catalog';
import styles from './Channel.module.scss';

export const Channel: FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [filtereVideos, setFilteredVideos] = useState<IVideo[]>([]);
    const { id } = useParams();
    const {addMsg} = useActions();
    useEffect(() => {
        UserService.getById(Number(id))
            .then(data => {
                setUser(data);
                setFilteredVideos(data.videos!.filter(video => video.isPublic === true))
            })
            .catch(e => addMsg({message: e.message, status: 500}))

    }, [id])

    return (

        <Layout title={`${user?.name} - video channel` || 'Channel'}>
            <div className={styles.channel_wrapper}>
                <div className={styles.channel_top}>
                    {user ? <ShortInfo channel={user} /> : null}
                    <Subscribe channelIdToSub={user?.id} />
                </div>
                <article className={styles.channel_description}>{user?.description}</article>
            </div>
            <Catalog videosToRender={filtereVideos} title='User videos' />
        </Layout>
    )
}