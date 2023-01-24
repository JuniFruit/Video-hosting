import { FC } from "react"
import { Controller } from "react-hook-form";
import Field from "../../../../ui/fields/Fields";
import { UploadField } from "../../../../ui/fields/upload-field/UploadField";
import TextArea from "../../../../ui/text-area/TextArea";
import { useUploadForm } from "./useUploadForm"
import { IMediaResponse } from "../../../../../services/media/Media.interface";
import { UploadVideoInfo } from "./upload-video-info/UploadVideoInfo";
import { UploadFormFooter } from "./upload-footer/UploadFormFooter";
import { ToggleSwitch } from "../../../../ui/switcher/ToggleSwitch";
import styles from './UploadForm.module.scss';
import { IUploadForm } from "./UploadForm.interface";


export const UploadForm: FC<IUploadForm> = (
    {
        handleCloseModal,
        videoId,
        isEdit,
        onCloseUnfinished
    }) => {

    const { form, media, status } = useUploadForm({ handleCloseModal, videoId });

    return (
        <form onSubmit={form.handleSubmit(form.onSubmit)}>
            {status.isChosen || isEdit
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
                            <div className={styles.upload_field}>
                                <Controller
                                    control={form.control}

                                    {...form.register('thumbnailPath', {
                                        required: 'Please choose a thumbnail first'
                                    })}
                                    render={({ field: { onChange } }) => (

                                        <UploadField
                                            title="Choose a thumbnail"
                                            onChange={(value: IMediaResponse) => onChange(value.url)}
                                            type={'image'}

                                        />
                                    )}
                                />


                            </div>

                        </div>
                        <UploadVideoInfo
                            error={form.errors.thumbnailPath}
                            thumbnailPath={media.thumbnailPath}
                        />

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
                        isEdit={isEdit}
                        isProcessing={status.isProcessing}
                        onCloseUnfinished={onCloseUnfinished}
                    />


                </>
                :
                (
                    <Controller
                        control={form.control}
                        {...form.register('videoPath', {
                            required: ''
                        })}
                        render={() => (

                            <UploadField
                                title={'Choose a video to upload'}
                                setValue={status.setProgress}
                                onChange={media.handleUploadVideo}
                                onChooseFile={status.setIsChosen}
                                type={'video'}
                            />
                        )}
                    />
                )
            }
        </form>
    )
}