import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../../hooks/useAuth";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import { IAuthForm } from "./AuthForm.interface";
import { FaUserCircle } from 'react-icons/fa';
import Field from "../../../../ui/fields/Fields";
import styles from './AuthForm.module.scss';
import styleElements from '../RightElements.module.scss';
import { validEmail } from "../../../../../utils/generalUtils";
import { Button } from "../../../../ui/button/Button";
import { useActions } from "../../../../../hooks/useActions";


export const AuthForm: FC = () => {

    const { ref, isShow, setIsShow } = useClickOutside(false);
    const [type, setType] = useState<'login' | 'register'>('login');

    const {isLoading } = useAuth();
    const {login, register: registerAction} = useActions();
    
    const { register, formState: { errors }, handleSubmit} = useForm<IAuthForm>({
        mode: 'onChange'
    });

    const onSubmit:SubmitHandler<IAuthForm> = (data) => {
        if (type === 'login') {
            login(data)
        } else if (type === 'register') {
            registerAction(data);
        }
    }
   

    return (
        <div className={styles.wrapper} ref={ref}>
            <button className={styleElements.button} onClick={() => setIsShow(!isShow)}>
                <FaUserCircle />
            </button>

            { isShow
                ?
                <form className={styles.form} onSubmit={(e) => {e.preventDefault(); handleSubmit(onSubmit)()}}>
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
                        <Button onClick={(e) => setType('login')} >
                            Log in
                        </Button>
                        <Button onClick={() => setType('register')} disabled={isLoading} className={styles.register}>
                            Sign up
                        </Button>
                    </div>
                </form>
                :
                null
            }
        </div>
    )
}