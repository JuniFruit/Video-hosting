import { AxiosError } from "axios";
import { ChangeEvent } from "react";
import { useMutation } from "react-query";
import { useActions } from "../../../../hooks/useActions";
import { MediaService } from "../../../../services/media/media.service";




export const useUpload = (
    onChange: (...event: any) => void,
    setValue?: (val: number) => void,
    folder?: string,
    onChooseFile?: (val:boolean) => void) => {

    const { mutateAsync } = useMutation('upload file',
        (data: FormData) => MediaService.upload(data, folder, setValue), {
        onSuccess: ({ data }) => {
            onChange(data);
            
        },
        onError: (err: any) => {
            addMsg({message: `Failed to upload a file. ${err.response?.data?.message!}`, status: 500})
            onChooseFile && onChooseFile(false)
        }
    })

    const {addMsg} = useActions()

    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;        

        onChooseFile && onChooseFile(true);

        const formData = new FormData();
        formData.append('media', files[0]);

        await mutateAsync(formData);

        
    }

    return { uploadFile };
}   