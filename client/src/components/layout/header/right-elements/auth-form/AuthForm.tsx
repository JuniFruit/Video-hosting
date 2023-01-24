import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useActions } from "../../../../../hooks/useActions";
import { useAuth } from "../../../../../hooks/useAuth";
import { validEmail } from "../../../../../utils/generalUtils";
import { Button } from "../../../../ui/button/Button";
import Field from "../../../../ui/fields/Fields";
import { IAuthForm, IAuthFormComponent } from "./AuthForm.interface";
import styles from './AuthForm.module.scss';


const AuthForm: FC<IAuthFormComponent> = ({ setIsShow }) => {

    const { isLoading } = useAuth();
    const { login } = useActions();

    const { register, formState: { errors }, handleSubmit } = useForm<IAuthForm>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<IAuthForm> = (data) => {
        login(data)
    }


    return (
        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)() }}>
            <Field
                {...register('email', {
                    required: 'Please enter your e-mail',
                    pattern: {
                        value: validEmail,
                        message: 'Please enter a valid email'
                    }
                })}
                placeholder={"Your email"}
                error={errors.email}
            />
            <Field
                {...register('password', {
                    required: 'Please enter your password',
                    minLength: {
                        value: 6,
                        message: 'At least 6 symbols'
                    }
                })}
                placeholder={"Your password"}
                error={errors.password}
            />
            <div className={'mt-5 mb-1 text-center'}>
                <Button type="submit">
                    Log in
                </Button>
                <Link onClick={() => setIsShow(false)} to={'/registration'} className={styles.register}>
                    Sign Up
                </Link>
            </div>
        </form>
    )
}

export default AuthForm