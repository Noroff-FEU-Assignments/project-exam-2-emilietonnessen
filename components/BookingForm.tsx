import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup.d";

import * as regex from '../constants/regex';
import { SubmitButton } from './UI/Button';
import Input from "./UI/Form/Input";
import Select from "./UI/Form/Select";
import Textarea from "./UI/Form/Textarea";


// TypeScript for Yup
interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape({
    room:
        yup.string()
        .required('Please select a room option'),
    firstName: 
        yup.string()
        .required('Please enter your first name')
        .min(2, 'Please enter 2 or more letters'), // There exist names with only two letters.
    lastName: 
        yup.string()
        .required('Please enter your last name')
        .min(3, 'Please enter 3 or more letters'),
    email:
        yup.string()
        .required('Please enter a Email address')
        .matches(regex.email, 'Please enter a valid email address'),
    phone:
        yup.number() 
        .typeError('Please enter your phone number')
        .required('Please enter your phone number')
        .min(10000000, 'Please enter at least 8 numbers'),
    startDate:
        yup.string()
        .required('Enter a start date'),
    endDate:
        yup.string()
        .required('Enter an end date'),
    message:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters')
});

interface BookingFormProps {
    establishment: string;
}

const BookingForm: React.FC<BookingFormProps> = ({establishment}) => {
    const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);
	const http = useAxios();

    // Putting React Hook Form and Yup validation together with a resolver
    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(schema)
    });

    // Handle the Submit
        data.establishment = establishment;
    }

    return (
        <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>

            {/* Title: */}
            <h3 className="booking-form__title">Book now!</h3>

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
                placeholder="What can we do for you?"
                register={register}
                error={errors.message && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.message.message}</span>} />


            {/* Submit: */}
            <div className="form__group booking-form__group--submit">
                <SubmitButton theme="primary" size="md">
                    book
                </SubmitButton> 
            </div>
        </form>
    );
}

export default BookingForm;