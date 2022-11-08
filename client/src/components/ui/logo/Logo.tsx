import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo: FC = () => {
    return <Link to={'/'} className={styles.logo}>
        <span>Me</span>
        <span>Tube</span>
    </Link>

}