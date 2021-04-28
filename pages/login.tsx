import Head from 'next/head';
import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup.d";
import { useState } from "react";

import Layout from '../components/Layout';
import Button from '../components/UI/Button';
import Input from '../components/UI/Form/Input';
import { TITLE_LOGIN, META_LOGIN } from '../constants/meta';
import { Logo } from '../components/UI/Icons';

interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape({
    username: 
        yup.string()
        .required('Please enter your first name')
        .min(2, 'Please enter 5 or more letters'),
    password:
        yup.string()
        .required('Please enter a Email address'),
});

const login = () => {
    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <>
        <Head>
            <script src="https://kit.fontawesome.com/0011017bbe.js" crossOrigin="anonymous"></script>
            <link rel="icon" href="/favicon.ico"  type="image/gif" sizes="16x16"></link>
			<meta name="description" content={META_LOGIN} />
			<title>{TITLE_LOGIN}</title>
        </Head>

        <div className="login">
            <div className="login__box">
                <div className="login__brand">
                    <div className="login__logo-icon">
                        <Logo color="#ff1447" />
                    </div>
                    <h1 className="login__logo">Holidaze</h1>
                </div>

                <div className="login__fields">
                    <Input
                        register={register}
                        name="username"
                        label="Username"
                        type="text"
                        error={errors.username && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.username.message}</span>}
                        placeholder="noranordmann" />

                    <Input
                        register={register}
                        name="password"
                        label="Password"
                        type="text"
                        error={errors.password && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.password.message}</span>}
                        placeholder="********" />

                    <div className="login__essentials">
                        <div className="login__remember">
                            <input type="checkbox" name="remember" id="remember"/>
                            <label htmlFor="checkbox">Remember me</label>
                        </div>
                        <a className="login__forgot" href="#forgot">
                            Forgot Password?
                        </a>
                    </div>
                </div>

                <div className="login__button">
                    <Button link="/" theme="primary" size="md">
                        login
                    </Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default login; 