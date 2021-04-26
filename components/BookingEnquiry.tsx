import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup.d";

import * as regex from '../constants/regex';
import { ModalButton } from './UI/Button';
import Modal from './UI/Modal';
import Input from "./UI/Form/Input";

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

interface BookingEnquiryProps {
    email: string;
    phone: number;
    street: string;
    zipcode: number;
    city: string;
}

const BookingEnquiry: React.FC<BookingEnquiryProps> = ({email, phone, street, zipcode, city }) => {
    // Validation stuff
    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit: () => void = () => {
        console.log('submitted');

        //alert('Your Message was sent!');
    }

    console.log('[Errors]', errors);
    console.log('[Watch FirstName]', watch("firstName"));


    return (
        <Modal link="#main">
            <div className="booking-enquiry">

                {/* Left Side: Booking Information */}
                <section className="booking-info">
                    <div className="booking-info__content">
                        <div className="booking-info__box">
                            <img className="booking-info__icon" src="/assets/icons/address-primary.svg" alt="Map Icon"/>
                            <h5 className="booking-info__title">Address</h5>
                            <p className="booking-info__text">{street}</p>
                            <p className="booking-info__text">{zipcode}, {city}</p>
                            <p className="booking-info__text">Norway</p>
                        </div>
                        <div className="booking-info__box">
                            <img className="booking-info__icon" src="/assets/icons/phone-solid.svg" alt="Map Icon"/>
                            <h5 className="booking-info__title">Phone</h5>
                            <p className="booking-info__text">+47 {phone}</p>
                        </div>
                        <div className="booking-info__box">
                            <img className="booking-info__icon" src="/assets/icons/envelope-solid.svg" alt="Map Icon"/>
                            <h5 className="booking-info__title">Email</h5>
                            <p className="booking-info__text">{email}</p>
                        </div>
                    </div>
                </section>
                
                {/* Right Side: Booking Form */}
                {/* Note: Remember to remove "autoComplete="nope""- this is just temporarily to watch the form behave correctly without any drop downs in the way. */}
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
                    {/* <Input
                        name="firstName"
                        label="First Name"
                        type="text"
                        placeholder="Nora"
                        register={register} >
                        {errors.firstName && <span className="form__error">{errors.firstName.message}</span>}
                    </Input> */}

                    <div className={"form__group " + `booking-form__group--firstName`}>
                        <label 
                            htmlFor="firstName" 
                            className="form__label"
                        >
                            First Name
                        </label>

                        <input 
                                
                            autoComplete="nope"
                            ref={register}
                            name="firstName" 
                            type="text" 
                            className="form__input "
                            id="name"
                            placeholder="Nora"
                        />
                        
                        {errors.firstName && <span className="form__error">{errors.firstName.message}</span>}
                    </div>

                    

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
                        <input type="date" name="startDate" id="startDate" className="form__input"/>
                    </div>

                    {/* End Date: */}
                    <div className="form__group booking-form__group--endDate">
                        <label htmlFor="end-date" className="form__label">End Date:</label>
                        <input type="date" name="end-date" id="end-date" className="form__input"/>
                    </div>

                    {/* Message: */}
                    <div className="form__group booking-form__group--message">
                        <label htmlFor="message" className="form__label">Message</label>
                        <textarea name="message" id="message" className="form__textarea" placeholder="What can we do for you?" autoComplete="nope" />
                    </div>

                    {/* <div className="booking-form__submit booking-form__group--submit"> */}
                        <ModalButton type="submit" theme="primary" size="md">
                            book
                        </ModalButton>
                    {/* </div> */}
                    
                    
                </form>
            </div>
        </Modal>
    );
}

export default BookingEnquiry;