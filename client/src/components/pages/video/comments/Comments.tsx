import { FC, MouseEventHandler, useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useAuth } from '../../../../hooks/useAuth';
import { useIsMobile } from '../../../../hooks/useMobile';
import { IComment } from '../../../../types/comment.interface';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import styles from './Comments.module.scss';

export const Comments: FC<{ comments: IComment[], videoId: number }> = ({ comments, videoId }) => {
    const [open, setIsOpen] = useState(false);
    const { user } = useAuth();
    const {isMobile} = useIsMobile();

    const handleClick: MouseEventHandler = (e) => {
        e.preventDefault();
        if (!isMobile) return;
        setIsOpen(prev => !prev);
    }

    return (
        <div className={styles.comments}>
            <div className={styles.comments_section}>
                <h2 onClick={handleClick}>
                    Comments
                    {isMobile && open ? <IoChevronUp /> : <IoChevronDown />}
                </h2>
                
                <div className={styles.line}></div>
                <div 
                    className={styles.comments_block}
                    style={{height: open && isMobile ? '27rem' : !open && isMobile ? '5rem' : ''}}>

                    {
                        comments.length
                            ?
                            <div>
                                {comments.map(comment => (
                                    <CommentItem comment={comment} key={comment.id} />
                                ))}
                            </div>
                            :
                            <p>
                                No comments yet
                            </p>
                    }
                </div>
            </div>


            <div className={styles.bottomForm}>
                {user && <CommentForm videoId={videoId} />}
            </div>

        </div>
    )
}