import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMediaResponse } from "../../../../../services/media/Media.interface";
import { videoApi } from "../../../../../store/api/video.api";
import { IVideoDto } from "../../../../../types/video.interface";

interface IUseUploadForm {
    videoId: number;
    handleCloseModal: () => void;
}

export const useUploadForm = (
    {
        videoId,
        handleCloseModal
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

    const [updateVideo, {isSuccess}] = videoApi.useUpdateMutation()

    const onSubmit: SubmitHandler<IVideoDto> = (data) => {
        updateVideo({...data, id: videoId}).unwrap().then(() => {
            handleCloseModal();
            reset();
        });
    }
    const [videoFile, setVideoFile] = useState('');
    
    const videoPath = watch('videoPath');
    const thumbnailPath = watch('thumbnailPath');

    const handleUploadVideo = (value: IMediaResponse) => {
        setValue('name', value.name);
        setValue('videoPath', value.url);
        setVideoFile(value.name);
    }

    const [isChosen, setIsChosen] = useState<boolean>(false);
    const [percent, setPercent] = useState(0);
    const [isUploaded, setIsUploaded] = useState(false);

    const setProgress = (val:number) => {
        setPercent(val);
        if(percent === 100) setIsUploaded(true);
    }

    return {
        form: {
            register,
            errors,
            control,
            handleSubmit,
            onSubmit
        },
        media: {
            videoFile,
            videoPath,
            thumbnailPath,
            handleUploadVideo
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