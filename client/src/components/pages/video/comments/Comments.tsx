import { FC } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { IComment } from '../../../../types/comment.interface';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import styles from './Comments.module.scss';

export const Comments: FC<{ comments: IComment[], videoId: number }> = ({ comments, videoId }) => {

    const { user } = useAuth();

    return (
        <div className={styles.comments}>
            <h2>Comments</h2>
            <div className={styles.line}></div>
            <div className={styles.comments_block} >

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


            <div className={styles.bottomForm}>
                {user && <CommentForm videoId={videoId} />}
            </div>

        </div>
    )
}