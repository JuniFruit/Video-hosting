import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import { IMediaResponse } from "../../../services/media/Media.interface";
import { validEmail, validPassword } from "../../../utils/generalUtils";
import { Button } from "../button/Button";
import Field from "../fields/Fields";
import { UploadField } from "../fields/upload-field/UploadField";
import TextArea from "../text-area/TextArea";
import AvatarElement from "../user-avatar/AvatarElement";
import { IProfileForm } from "./ProfileForm.interface";
import styles from './ProfileForm.module.scss';

const ProfileForm: FC<IProfileForm> = ({ form, title, fieldsToExclude, buttonTitle, defaultValues }) => {
    const [avatarPath, setAvatarPath] = useState('');

    return (
        <div className={styles.wrapper}>

            <h1>{title}</h1>
            <form className={styles.form_box} onSubmit={form.handleSubmit}>
                {!fieldsToExclude?.email && <div>
                    <Field
                        {...form.register('email', {
                            required: 'Please enter your emal',
                            pattern: {
                                value: validEmail,
                                message: 'Please enter a valid email'

                            }
                        })}
                        placeholder='Email'
                        error={form.errors.email}
                    />
                </div>}

                {!fieldsToExclude?.username && <div>
                    <Field
                        {...form.register('name', {
                            required: 'Please enter your username'
                        })}
                        placeholder='Username'
                        defaultValue={defaultValues?.name}
                        error={form.errors.name}
                    />
                </div>}

                {!fieldsToExclude?.password && <div>
                    <Field
                        {...form.register('password', {
                            required: 'Please enter your password',
                            pattern: {
                                value: validPassword,
                                message: 'Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters'

                            }
                        })}
                        placeholder='Password'
                        error={form.errors.password}
                    />
                </div>}
                {!fieldsToExclude?.description && <div>
                    <TextArea
                        {...form.register('description', {

                        })}
                        placeholder='Description of your channel'
                        maxLength={200}
                        defaultValue={defaultValues?.description}
                        error={form.errors.description}
                    />
                </div>}
                {!fieldsToExclude?.avatar && <div className={styles.avatar_field}>
                    <Controller
                        control={form.control}
                        name='avatarPath'
                        defaultValue={defaultValues?.avatar}
                        render={() => (
                            <UploadField
                                onChange={(res: IMediaResponse) => {
                                    form.setValue('avatarPath', res.url);
                                    setAvatarPath(res.url)
                                }}
                                folder="avatars"
                                type="image"
                            />
                        )}

                    />
                    <div className={styles.avatar_preview}>
                        <AvatarElement avatarPath={avatarPath || defaultValues?.avatar} />
                    </div>

                </div>}
                <div>
                    <Button title="Submit the form">
                        {buttonTitle || 'Submit'}
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default ProfileForm