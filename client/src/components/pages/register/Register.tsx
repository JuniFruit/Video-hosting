import { FC, useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { IMediaResponse } from "../../../services/media/Media.interface";
import { validEmail, validPassword } from "../../../utils/generalUtils";
import { Layout } from "../../layout/Layout"
import RegisterForm from "../../ui/profile-form/ProfileForm";
import { IRegisterForm } from "./Register.interface";
import styles from './Register.module.scss';

const RegisterPage: FC = () => {
   
    const {user} = useAuth()
    const { register: registerAction } = useActions();
    const navigate = useNavigate()

    useEffect(() => {
        // for redirecting on success (unwrap asyncThunk doesn't work for some reason)
        if (user) navigate('/');
    }, [user])

    const {
        formState: { errors },
        register,
        control,
        handleSubmit,
        setValue,
    } = useForm<IRegisterForm>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
        registerAction(data)       
    }

    return (

        <Layout title="MeTube registration">
            <section className={styles.container}>
                <RegisterForm 
                    form = {{
                        handleSubmit: () => handleSubmit(onSubmit),
                        setValue,
                        control,
                        register,
                        errors
                    }}
                    title={"Please fill out fields to register an account"}
                    buttonTitle="Create account"
                />
            </section>

        </Layout>
    )
}

export default RegisterPage