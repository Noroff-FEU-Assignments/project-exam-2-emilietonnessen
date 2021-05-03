import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup.d";
import { useState } from "react";

import * as regex from '../../constants/regex';
import useAxios from "../../hooks/useAxios.js";
import { ESTABLISHMENTS_URL } from "../../constants/api";


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

const EstablishmentForm = () => {
    const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);
	const http = useAxios();

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data: any) {
        setSubmitting(true);
		setServerError(null);
        
        // Adds the current Establishment to the Enquiry Data
        //data.establishment = establishment;
		
        console.log(data);

		try {
			const response = await http.post(ESTABLISHMENTS_URL, data);

            // Console log the data saved in the api
			console.log("[ESTABLISHMENTS]", response.data);

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
        <form>
            
        </form>
    );
}

export default EstablishmentForm;