import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../../hooks/useAuth";
import { IMediaResponse } from "../../../../../services/media/Media.interface";
import { videoApi } from "../../../../../store/api/video.api";
import { IVideoDto } from "../../../../../types/video.interface";

interface IUseUploadForm {
    handleCloseModal: () => void;
}

export const useUploadForm = (
    {
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

    const { user } = useAuth();

    const [videoId, setVideoId] = useState<number | null>(null)

    const [createVideo] = videoApi.useCreateMutation()

    const [updateVideo, { isSuccess }] = videoApi.useUpdateMutation()

    const onSubmit: SubmitHandler<IVideoDto> = (data) => {
        console.log(videoId)
        if (!videoId) return;

        updateVideo({ ...data, id: videoId }).unwrap().then(() => {
            handleCloseModal();
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
        if (percent === 100) setIsUploaded(true);

        setPercent(val);
    }


    const handleCreateVideo = (fileChosen:boolean) => {
        setIsChosen(fileChosen);
        console.log(user);
        if (!user) return;
        createVideo(user?.id).unwrap().then(res => setVideoId(res))

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
            handleCreateVideo
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