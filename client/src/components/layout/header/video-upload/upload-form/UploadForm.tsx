import { FC } from "react"
import { Controller } from "react-hook-form";
import Field from "../../../../ui/fields/Fields";
import { UploadField } from "../../../../ui/fields/upload-field/UploadField";
import TextArea from "../../../../ui/text-area/TextArea";
import { SuccessMsg } from "./SuccessMsg";
import { useUploadForm } from "./useUploadForm"
import { IMediaResponse } from "../../../../../services/media/Media.interface";
import { UploadVideoInfo } from "./upload-video-info/UploadVideoInfo";
import { UploadFormFooter } from "./upload-footer/UploadFormFooter";
import { ToggleSwitch } from "../../../../ui/switcher/ToggleSwitch";
import styles from './UploadForm.module.scss';

export const UploadForm: FC<{handleCloseModal: () => void }> = (
    {
        
        handleCloseModal
    }) => {

    const { form, media, status } = useUploadForm({ handleCloseModal });



    return (
        <form onSubmit={form.handleSubmit(form.onSubmit)}>
            {status.isSuccess && <SuccessMsg />}
            {status.isChosen
                ?
                <>

                    <div className={styles.form_wrapper}>
                        <div className={styles.fields_wrapper}>
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
                                <Controller
                                    control={form.control}
                                    name='thumbnailPath'
                                    render={({ field: { onChange } }) => (

                                        <UploadField
                                            folder="thumbnails"
                                            title="Choose a thumbnail"
                                            onChange={(value: IMediaResponse) => onChange(value.url)}
                                        />
                                    )}
                                />


                            </div>

                        </div>
                        <UploadVideoInfo thumbnailPath={media.thumbnailPath} />

                    </div>
                    <div>
                        <Controller
                            control={form.control}
                            name='isPublic'
                            defaultValue={true}
                            render={({ field: { onChange, value } }) => (
                                <ToggleSwitch
                                    clickHandler={() => onChange(!value)}
                                    isEnabled={!!value}
                                />
                            )}
                        />
                    </div>

                    <UploadFormFooter
                        progress={status.percent}
                        isUploaded={status.isUploaded}
                    />


                </>
                :
                (
                    <Controller
                        control={form.control}
                        name="videoPath"
                        render={() => (

                            <UploadField
                                onChooseFile={status.setIsChosen}
                                title={'Choose a video to upload'}
                                folder="videos"
                                setValue={status.setProgress}
                                onChange={media.handleUploadVideo}
                            />
                        )}
                    />
                )
            }
        </form>
    )
}