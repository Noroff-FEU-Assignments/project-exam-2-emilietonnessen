import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup.d";

import * as regex from '../constants/regex';
import { ModalButton } from './UI/Button';
import Input from "./UI/Form/Input";

// TypeScript for Yup
interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape({
    room:
        yup.string()
        .required('Please Select a room option'),
    firstName: 
        yup.string()
        .required('Please enter your name')
        .min(3, 'Please enter 3 or more letters'),
    lastName: 
        yup.string()
        .required('Please enter your name')
        .min(4, 'Please enter 4 or more letters'),
    email:
        yup.string()
        .required('Please enter a Email address')
        .matches(regex.email, 'Please enter a valid email address'),
    phone:
        yup.string()
        .required('Please enter a phone number'),
    startDate:
        yup.string()
        .required('Enter a start date'),
    endDate:
        yup.string()
        .required('Enter a start date'),
    message:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters')
});



const BookingForm: React.FC = () => {
    // Validation stuff
    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = () => {
        console.log("submitted");
    };

    console.log('[Errors]', errors);
    console.log('[Watch FirstName]', watch("firstName"));

    return (
        <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>

            <h3 className="booking-form__title">Book now!</h3>

                    {/* Choose a room: */}
                    <div className="form__group booking-form__group--room">
                        <label htmlFor="room" className="form__label">Choose a room</label>
                        <select name="room" id="room" className="form__input" placeholder="Choose a Room">
                            <option value=" " hidden></option>
                            <option value="standard">Standard Room</option>
                            <option value="superior">Superior Room</option>
                            <option value="family">Family Room</option>
                        </select>
                    </div>

                    {/* First Name */}
                    <Input
                        name="firstName"
                        label="First Name"
                        type="text"
                        placeholder="Nora"
                        register={register} >
                        {errors.firstName && <span className="form__error">{errors.firstName.message}</span>}
                    </Input> 



                    

                    {/* Last Name */}
                    <Input
                        name="lastName"
                        label="Last Name"
                        type="text"
                        placeholder="Nordmann"
                        register={register} 
                    >
                        {errors.lastName && <span className="form__error">{errors.lastName.message}</span>}
                    </Input>


                    {/* Email: */}
                    <Input
                        name="email"
                        label="Email"
                        type="text"
                        placeholder="nora@nordmann.no"
                        register={register} 
                    >
                        {errors.email && <span className="form__error">{errors.email.message}</span>}
                    </Input>


                    {/* Phone Number: */}
                    <Input
                        name="phone"
                        label="Phone Number"
                        type="text"
                        placeholder="123 45 678"
                        register={register} 
                    
                    >
                        {errors.phone && <span className="form__error">{errors.phone.message}</span>}
                    </Input>


                    {/* Start Date: */}
                    <div className="form__group booking-form__group--startDate">
                        <label htmlFor="startDate" className="form__label">Start Date:</label>
                        <input type="date" name="startDate" id="startDate" className="form__input" ref={register}/>
                    </div>

                    {/* End Date: */}
                    <div className="form__group booking-form__group--endDate">
                        <label htmlFor="end-date" className="form__label">End Date:</label>
                        <input type="date" name="end-date" id="end-date" className="form__input" ref={register}/>
                    </div>

                    {/* Message: */}
                    <div className="form__group booking-form__group--message">
                        <label htmlFor="message" className="form__label">Message</label>
                        <textarea name="message" id="message" className="form__textarea" placeholder="What can we do for you?" autoComplete="nope" ref={register}/>
                    </div>

                    
                    <ModalButton type="submit" theme="primary" size="md">
                        book
                    </ModalButton>
                    
                    
                    
                </form>
    );
}

export default BookingForm;