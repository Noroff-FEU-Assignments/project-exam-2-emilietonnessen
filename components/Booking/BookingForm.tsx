import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup.d";
import { useState } from "react";

import useAxios from "../../hooks/useAxios.js";
import Input from "../UI/Form/Input";
import Select from "../UI/Form/Select";
import Textarea from "../UI/Form/Textarea";
import { ENQUIRY_URL } from "../../constants/api";
import { SubmitButton } from '../UI/Button';
import { bookingFormSchema } from "../../constants/schemas";
import { BookingFormProps } from "../../constants/interfaces.js";


// TypeScript for Yup and Yup validation
interface Schema extends Asserts<typeof schema> {}
const schema = yup.object().shape(bookingFormSchema);


const BookingForm: React.FC<BookingFormProps> = ({establishmentName}) => {
    const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);
	const http = useAxios();


    // Putting React Hook Form and Yup validation together with a resolver
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });


    // Handle the Submit
    async function onSubmit(data: any) {
        setSubmitting(true);
		setServerError(null);
        
        // Adds the current Establishment to the Enquiry Data
        data.establishment = establishmentName;
		
        console.log("[Data]", data);

		try {
			const response = await http.post(ENQUIRY_URL, data);

            // Console log the data saved in the api
			console.log("[Response]", response.data);

            // Close Booking Modal and open Feedback Modal
            window.location.href="#feedback-success";
		} catch (error) {
			console.log("[Error]", error);
			setServerError(error.toString());
		} finally {
			setSubmitting(false);
		}
    }

    return (
        <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>

            {/* Title: */}
            <h3 className="booking-form__title">Book now!</h3>

            {serverError && <div className="feedback--error">{serverError}</div>}

            <fieldset className="form__fieldset booking-form__fieldset">
                {/* Choose a room: */}
                <Select 
                    name="room" 
                    label="Choose a room" 
                    register={register} 
                    error={errors.room && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.room.message}</span>} >
                    <option value="standard">Standard Room</option>
                    <option value="superior">Superior Room</option>
                    <option value="family">Family Room</option>
                </Select>

                {/* First Name */}
                <Input
                    name="firstName"
                    label="First Name"
                    type="text"
                    placeholder="Nora"
                    register={register} 
                    error={errors.firstName && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.firstName.message}</span>} />
                        

                {/* Last Name */}
                <Input
                    name="lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Nordmann"
                    register={register} 
                    error={errors.lastName && <span className="form__error"> <i className="fas fa-exclamation-circle"></i>{errors.lastName.message}</span>} />
                        

                {/* Email: */}
                <Input
                    name="email"
                    label="Email"
                    type="text"
                    placeholder="nora@nordmann.no"
                    register={register} 
                    error={errors.email && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.email.message}</span>} />
                        

                {/* Phone Number: */}
                <Input
                    name="phone"
                    label="Phone Number"
                    type="text"
                    placeholder="123 45 678"
                    register={register} 
                    error={errors.phone && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.phone.message}</span>} />
                            
                        
                {/* Start Date: */}
                <Input 
                    name="startDate"
                    label="Start Date"
                    type="date"
                    register={register} 
                    error={errors.startDate && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.startDate.message}</span>} />
                    

                {/* End Date: */}
                <Input 
                    name="endDate"
                    label="End Date"
                    type="date"
                    register={register} 
                    error={errors.endDate && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.endDate.message}</span>} />
                        

                {/* Message: */}
                <Textarea 
                    name="message"
                    label="Message"
                    placeholder="How many adults, children will you bring with you?"
                    register={register}
                    error={errors.message && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.message.message}</span>} />


                {/* Submit: */}
                <div className="form__group booking-form__group--submit">
                    <SubmitButton theme="primary" size="md">
                        {submitting ? "booking..." : "book now"}
                    </SubmitButton> 
                </div>
            </fieldset>
        </form>
    );
}

export default BookingForm;