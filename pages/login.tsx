import Head from 'next/head';
import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup.d";
import { useState } from "react";

import Layout from '../components/Layout';
import {SubmitButton} from '../components/UI/Button';
import Input from '../components/UI/Form/Input';
import { TITLE_LOGIN, META_LOGIN } from '../constants/meta';
import { Logo } from '../components/UI/Icons';
import { ModalError, ModalSuccess } from '../components/UI/Modal';
import { useRouter, NextRouter } from 'next/router';
import { useContext } from "react";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from '../constants/api';

const url: string = BASE_URL + "auth/local";

interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape({
    identifier: yup.string().required('Please a username'),
    password: yup.string().required('Please a password'),
});




const login = () => {
    const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);
    
    
    const router: NextRouter = useRouter();

    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(schema)
    });

    

    const [auth, setAuth]: any = useContext(AuthContext);

    const onSubmit: (data: {}) => Promise<void>  = async (data) => {
        setSubmitting(true);

        console.log("1: onSubmit activated");
        console.log("2: [Data]", data);

        
        try {
            console.log("3: Trying to get a response from the URL");
			const response = await axios.post(url, data);

			console.log("4: [Response Data]", response.data);
			setAuth("Set Auth");
            
            
			//router.push("/admin");
            console.log('5: Data went through')
		} catch (error) {
			console.log("6: [Error]", error);
			setLoginError(error.toString());
		} finally {
			setSubmitting(false);
		}
    }

    console.log("[Auth]", auth);

    return (
        <>
        <AuthProvider>
            <Head>
                <script src="https://kit.fontawesome.com/0011017bbe.js" crossOrigin="anonymous"></script>
                <link rel="icon" href="/favicon.ico"  type="image/gif" sizes="16x16"></link>
                <meta name="description" content={META_LOGIN} />
                <title>{TITLE_LOGIN}</title>
            </Head>

            <div className="login" id="login">
                <form onSubmit={handleSubmit(onSubmit)}>

                    

                    <fieldset disabled={submitting} className="form__fieldset login__box">
                        <div className="login__brand">
                            <div className="login__logo-icon">
                                <Logo color="#ff1447" />
                            </div>
                            <h1 className="login__logo">Holidaze</h1>
                        </div>

                        <div className="login__fields">

                            {/* Display an error */}
                            {loginError && <div className="form__feedback--error">{loginError}</div>}
                            <Input
                                register={register}
                                name="identifier"
                                label="Username"
                                type="text"
                                error={errors.username && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.username.message}</span>}
                                placeholder="noranordmann" />

                            <Input
                                register={register}
                                name="password"
                                label="Password"
                                type="password"
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
                            <SubmitButton  theme="primary" size="md">
                                {submitting ? "loggin in..." : "login"}
                            </SubmitButton>
                        </div>
                    </fieldset>
                    
                </form>

            </div>

            <ModalError link="#login" errorMessage="Please try again!" errorTitle="An error occured" />
        </AuthProvider>
        
        </>
    );
}

export default login; 