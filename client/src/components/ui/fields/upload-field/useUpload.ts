import { ChangeEvent } from "react";
import { useMutation } from "react-query";
import { useActions } from "../../../../hooks/useActions";
import { MediaService } from "../../../../services/media/media.service";



export const useUpload = (
    onChange: (...event: any) => void,
    setValue?: (val: number) => void,
    folder?: string,
    onChooseFile?: (val: boolean) => void) => {

    const { mutateAsync } = useMutation('upload file',
        (data: FormData) => MediaService.upload(data, folder, setValue), {
        onSuccess: ({ data }) => {
            onChange(data);

        },
        onError: (err: any) => {
            addMsg({ message: `Failed to upload a file. ${err.response?.data?.message!}`, status: 500 })
            onChooseFile && onChooseFile(false)
        }
    })

    const { addMsg } = useActions()

    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;

        try {
            let videoDuration = 0;
            
            if (files[0].type.includes('video')) {

                const videoTag = await validateVideoFile(files[0]);
                videoDuration = videoTag.duration

            }

            onChooseFile && onChooseFile(true);
            console.log(videoDuration);
            const formData = new FormData();
            formData.append('media', files[0]);
            formData.append('media', videoDuration.toString())

            await mutateAsync(formData);

        } catch (error) {
            addMsg({message: error, status: 500})
        }


    }

    const validateVideoFile = (file:File):Promise<HTMLVideoElement> => new Promise((resolve, reject) => {
        try {
            let video = document.createElement('video')
            video.preload = 'metadata'
    
            video.onloadedmetadata = function () {
                resolve(video)
            }
    
            video.onerror = function () {
                reject("Invalid video. Please select a video file.")
            }
    
            video.src = window.URL.createObjectURL(file)
        } catch (e) {
            reject(e)
        }
    })

    return { uploadFile };
}   