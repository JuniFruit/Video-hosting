import { FC } from "react"
import { Controller } from "react-hook-form";
import Field from "../../../../ui/fields/Fields";
import { UploadField } from "../../../../ui/fields/upload-field/UploadField";
import TextArea from "../../../../ui/text-area/TextArea";
import { SuccessMsg } from "./SuccessMsg";
import { useUploadForm } from "./useUploadForm"
import { IMediaResponse } from "../../../../../services/media/Media.interface";


export const UploadForm: FC<{ videoId: number, handleCloseModal: () => void }> = (
    {
        videoId,
        handleCloseModal
    }) => {

    const { form, media, status } = useUploadForm({ videoId, handleCloseModal });

    return (
        <form onSubmit={form.handleSubmit(form.onSubmit)}>
            {status.isSuccess && <SuccessMsg />}
            {status.isChosen
                ?
                <>
                    <Field
                        {...form.register('name', {
                            required: 'Please enter the name'
                        })}
                        placeholder="Name"
                        error={form.errors.name}
                    />
                    <TextArea
                        {...form.register('description', {
                            required: "Description is required"
                        })}
                        placeholder="Description"
                        error={form.errors.description}
                    />
                    <div className="mt-8">
                        <UploadField 
                            
                        />

                        
                    </div>
                </>
                : 
                (
                    <UploadField />
                )
            }
        </form>
    )
}