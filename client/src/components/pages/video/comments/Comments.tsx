import { FC } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { IComment } from '../../../../types/comment.interface';
import { Line } from '../../../ui/misc/Line';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import styles from './Comments.module.scss';

export const Comments: FC<{ comments: IComment[], videoId: number }> = ({ comments, videoId }) => {

    const { user } = useAuth();

    return (
        <div className={styles.comments}>
            <h2>Comments</h2>
            <Line />
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

            <div className={styles.bottomForm}>
                {user && <CommentForm videoId={videoId} />}
            </div>

        </div>
    )
}