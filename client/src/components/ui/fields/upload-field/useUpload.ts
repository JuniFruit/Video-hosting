import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { MediaService } from "../../../../services/media/media.service";




export const useUpload = (
    onChange?: (...event: any) => void,
    setValue?: (val: number) => void,
    folder?: string,
    setIsChosen?: Dispatch<SetStateAction<boolean>>) => {

    const { mutateAsync } = useMutation('upload file',
        (data: FormData) => MediaService.upload(data, folder, setValue), {
        onSuccess: ({ data }) => {
            
        },
        onError: (err) => {
            window.alert(err);
        }
    })

    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;

        setIsChosen && setIsChosen(true);

        const formData = new FormData();
        formData.append('media', files[0]);

        await mutateAsync(formData);

        
    }

    return { uploadFile };
}   