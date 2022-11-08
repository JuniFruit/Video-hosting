import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { commentApi } from '../../../../store/api/comment.api';
import { ICommentDto } from '../../../../types/comment.interface';
import {MdSend} from 'react-icons/md';
import Field from '../../../ui/fields/Fields';

export const CommentForm: FC<{ videoId: number }> = ({ videoId }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ICommentDto>({
        mode: 'onChange'
    })

    const [createComment, { data, isLoading }] = commentApi.useCreateCommentMutation()

    const onSubmit: SubmitHandler<ICommentDto> = (data) => {
        createComment({ ...data, videoId }).unwrap().then(() => reset());
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'relative'}>
                <Field
                    {
                    ...register('body', {
                        required: 'Please enter a message'

                    })}
                    placeholder="Share your thoughts"
                    error={errors.body}
                />

                <button 
                    disabled={isLoading}
                    className="absolute text-xl right-2 text-purple top-1.5"
                >
                    <MdSend />
                </button>

              
            </div>

        </form>
    )
}