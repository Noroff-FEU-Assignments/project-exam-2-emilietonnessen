import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup.d";
import { useState } from "react";

import { CONTACT_URL } from "../../constants/api";
import * as regex from '../../constants/regex';
import useAxios from "../../hooks/useAxios.js";
import Input from "../UI/Form/Input";
import Textarea from "../UI/Form/Textarea";
import { SubmitButton } from "../UI/Button";

interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape({
    name: 
        yup.string()
        .required('Please enter your first name')
        .min(2, 'Please enter 5 or more letters'),
    email:
        yup.string()
        .required('Please enter a Email address')
        .matches(regex.email, 'Please enter a valid email address'),
    topic:
        yup.string()
        .required('Please enter your first name')
        .min(4, 'Please enter 4 or more letters'),
    message:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters')
});

const ContactForm: React.FC = () => {
    const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);
	const http = useAxios();

    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data: any) {
        setSubmitting(true);
		setServerError(null);
        
        // Adds the current Establishment to the Enquiry Data
        //data.establishment = establishment;
		
        console.log(data);

		try {
			const response = await http.post(CONTACT_URL, data);

            // Console log the data saved in the api
			console.log("[Response]", response.data);

            // Close Booking Modal and open Feedback Modal
            window.location.href="#feedback-success"
            


		} catch (error) {
			console.log("[Error]", error);
			setServerError(error.toString());

            // Move to feedback Error
            window.location.href="#feedback-error"
		} finally {
			setSubmitting(false);
		}
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>

            {/* Title: */}
            <h3 className="booking-form__title">Send us a message</h3>

            {/* Full Name: */}
            <Input
                register={register}
                name="name"
                label="Name"
                type="text"
                error={errors.name && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.name.message}</span>}
                placeholder="Nora Nordmann" />

            {/* Email: */}
            <Input
                register={register}
                name="email"
                label="Email"
                type="text"
                error={errors.email && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.email.message}</span>}
                placeholder="nora@nordmann.no" />

            {/* Topic: */}
            <Input
                register={register}
                name="topic"
                label="Topic"
                type="text"
                error={errors.topic && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.topic.message}</span>}
                placeholder="My Message" />

            {/* Message: */}
            <Textarea
                register={register}
                name="message"
                label="Message"
                error={errors.message && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.message.message}</span>}
                placeholder="What can we help you with?" />

            <SubmitButton theme="primary" size="md">
                send
            </SubmitButton>

        </form>
    );
}

export default ContactForm;