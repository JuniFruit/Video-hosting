import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "../../../../../hooks/useActions";
import { IMediaResponse } from "../../../../../services/media/Media.interface";
import { videoApi } from "../../../../../store/api/video.api";
import { IVideoDto } from "../../../../../types/video.interface";

interface IUseUploadForm {
    handleCloseModal: () => void;
    videoId: number;
}

export const useUploadForm = (
    {
        handleCloseModal,
        videoId
    }: IUseUploadForm
) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
        control,
        reset
    } = useForm<IVideoDto>({
        mode: 'onChange'
    })   

    const {addMsg} = useActions();

    const [updateVideo, { isSuccess }] = videoApi.useUpdateMutation()

    const onSubmit: SubmitHandler<IVideoDto> = (data) => {
        if (!videoId) return;
        updateVideo({ ...data, id: videoId }).unwrap().then(() => {
            handleCloseModal();
            addMsg({message: 'Video saved', status: 200})
            reset();
        });
    }
    const [videoFile, setVideoFile] = useState('');
    const thumbnailPath = watch('thumbnailPath');
    const videoPath = watch('videoPath');

    const handleUploadVideo = (value: IMediaResponse) => {
        setValue('videoPath', value.url);
        setValue('name', value.name)
    }

    const [isChosen, setIsChosen] = useState<boolean>(false);
    const [percent, setPercent] = useState(0);
    const [isUploaded, setIsUploaded] = useState(false);

    const setProgress = (val: number) => {

        if (val == 100) setIsUploaded(true);
        setPercent(val);
    }   

    return {
        form: {
            register,
            errors,
            control,
            handleSubmit,
            onSubmit,
            setValue
        },
        media: {
            handleUploadVideo,
            videoPath,
            thumbnailPath,           
            videoId
        },
        status: {
            percent,
            isChosen,
            isUploaded,
            setProgress,
            setIsChosen,
            isSuccess
        }
    }
}