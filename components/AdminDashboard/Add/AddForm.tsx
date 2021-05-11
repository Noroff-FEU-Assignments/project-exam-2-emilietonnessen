import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

import * as regex from '../../../constants/regex';
import useAxios from "../../../hooks/useAxios";
import { ESTABLISHMENTS_URL } from "../../../constants/api";
import { Establishment } from "../../../constants/interfaces";
import Error from "../../UI/Form/Error";
import Input from "../../UI/Form/Input";
import Select from "../../UI/Form/Select";
import Textarea from "../../UI/Form/Textarea";
import { SubmitButton } from "../../UI/Button";
import { addEstablishmentSchema } from '../../../constants/schemas';


interface Schema extends yup.Asserts<typeof schema> {}

const schema = yup.object().shape({
    thumbnail: yup.object().shape({
        url: yup.string().required("Please enter an image url"),
    }),
    imageOne: yup.object().shape({
        url: yup.string().required("Please enter an image url"),
    }),
    imageTwo: yup.object().shape({
        url: yup.string().required("Please enter an image url"),
    }),
    name: 
        yup.string()
        .required('Please enter the name of the establishment'),
    category: 
        yup.string()
        .required('Please choose a category'),
    email:
        yup.string()
        .required('Please enter an email address')
        .matches(regex.email, 'Please enter a valid email address'),
    phone:
        yup.string()
        .required('Please enter a phone number')
        .min(8, "Please enter a valid phone number")
        .max(8, "Please enter a valid phone number"),
    coordinates:
        yup.string()
        .required('Please enter coordinates'),
    street:
        yup.string()
        .required('Please enter a street name'),
    city:
        yup.string()
        .required('Please enter a city'),
    zipCode:
        yup.string()
        .required('Please enter a zip code'),
    rating:
        yup.number()
        .required('Please enter the average user rating')
        .typeError("Please enter a number"),
    stars:
        yup.number()
        .required('Please enter the amount of stars')
        .typeError("Please enter a number"),
    featured:
        yup.boolean()
        .required('Please chose of the establishment should be featured')
        .typeError("Please enter a boolean value"),
    description:
        yup.string()
        .required('Please enter a description'),
    amenities:
        yup.string()
        .required('Please enter different amenities'),
});

const AddForm: React.FC = () => {

    // Put together React Hook Form and Yup validation.
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });


    // State
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [added, setAdded] = useState<boolean>(false);

    // Variables
    const http = useAxios();
    

    // Onsubmit
    async function onSubmit(data: any) {
        setSubmitting(true);
        setServerError(null);
        setAdded(false);

        //data.status = "publish";

        console.log("[Data]", data);

        try {
            const response = await http.post(ESTABLISHMENTS_URL, data);
            console.log("[Response]", response.data);
            setAdded(true);
        } catch (error) {
            console.log("[Onsubmit Error]", error);
            setServerError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && <div className="feedback--error">{serverError}</div>}
            {added && <div className="feedback--success">The Establishment was successfully added!</div>}
            <fieldset disabled={submitting} className="add-establishment__fieldset">

                <Input 
                    register={register}
                    name="thumbnail.url"
                    cssClass="add-establishment__group--thumbnail"
                    label="Thumbnail"
                    type="text"
                    error={errors.thumbnail && <Error>{errors.thumbnail.message}</Error>}
                    placeholder="Image URL" /> 

                {/* Image 2: */}
                <Input 
                    register={register}
                    name="imageOne.url"
                    cssClass="add-establishment__group--image-1"
                    label="Image 1"
                    type="text"
                    error={errors.imageOne && <Error>{errors.imageOne.message}</Error>}
                    placeholder="Image URL" /> 

                {/* Image 3: */}
                <Input 
                    register={register}
                    name="imageTwo.url"
                    cssClass="add-establishment__group--image-2"
                    label="Image 2"
                    type="text"
                    error={errors.imageTwo && <Error>{errors.imageTwo.message}</Error>}
                    placeholder="Image URL" /> 

                {/* Hotel Name: */}
                <Input 
                    register={register}
                    name="name"
                    cssClass="add-establishment__group--name"
                    label="Establishment Name"
                    type="text"
                    error={errors.name && <Error>{errors.name.message}</Error>}
                    placeholder="My Beautiful Establishment" />

                {/* Category: */}
                <Select 
                    name="category" 
                    cssClass="add-establishment__group--category"
                    label="Choose a Category"
                    register={register} 
                    error={errors.category && <Error>{errors.category.message}</Error>} >
                              
                    <option value="Hotel">Hotel</option>
                    <option value="BedAndBreakfast">Bed & Breakfast</option>
                    <option value="Guesthouse">Guesthouse</option>
                </Select>

                {/* Email: */}
                <Input
                    register={register}
                    name="email"
                    cssClass="add-establishment__group--email"
                    label="Email"
                    type="text"
                    error={errors.email && <Error>{errors.email.message}</Error>}
                    placeholder="establishment@support.no" />

                {/* Phone */}
                <Input
                    register={register}
                    name="phone"
                    cssClass="add-establishment__group--phone"
                    label="Phone"
                    type="text"
                    error={errors.phone && <Error>{errors.phone.message}</Error>}
                    placeholder="123 45 678" />


                {/* Coordinates */}
                <Input
                    register={register}
                    name="coordinates"
                    cssClass="add-establishment__group--coordinates"
                    label="Coordinates"
                    type="text"
                    error={errors.coordinates && <Error>{errors.coordinates.message}</Error>}
                    placeholder="latitude, longitude" />



                {/* Street name */}
                <Input
                    register={register}
                    name="street"
                    cssClass="add-establishment__group--street"
                    label="Street"
                    type="text"
                    error={errors.street && <Error>{errors.street.message}</Error>}
                    placeholder="Street Name 12" />

                {/* City */}
                <Input
                    register={register}
                    name="city"
                    cssClass="add-establishment__group--city"
                    label="City"
                    type="text"
                    error={errors.city && <Error>{errors.city.message}</Error>}
                    placeholder="City Name" />

                {/* Zip Code */}
                <Input
                    register={register}
                    name="zipCode"
                    cssClass="add-establishment__group--zip-code"
                    label="Zip Code"
                    type="text"
                    error={errors.zipCode && <Error>{errors.zipCode.message}</Error>}
                    placeholder="1234" />

                {/* Average User Rating */}
                <Input
                    register={register}
                    name="rating"
                    cssClass="add-establishment__group--rating"
                    label="User Rating"
                    type="text"
                    error={errors.rating && <Error>{errors.rating.message}</Error>}
                    placeholder="Ex: 7.9" />

                {/* Stars */}
                <Input
                    register={register}
                    name="stars"
                    cssClass="add-establishment__group--stars"
                    label="Stars"
                    type="text"
                    error={errors.rating && <Error>{errors.rating.message}</Error>}
                    placeholder="4" />

                {/* Featured */}
                <Input
                    register={register}
                    name="featured"
                    cssClass="add-establishment__group--featured"
                    label="Featured"
                    type="text"
                    error={errors.featured && <Error>{errors.featured.message}</Error>}
                    placeholder="true" />

                {/* Description */}
                <Textarea
                    register={register}
                    name="description"
                    cssClass="add-establishment__group--description"
                    label="Description"
                    placeholder="Establishment Description"
                    error={errors.description && <Error>{errors.description.message}</Error>} />

                {/* List of Amenities */}
                <Textarea
                    register={register}
                    name="amenities"
                    cssClass="add-establishment__group--amenities"
                    label="Amenities"
                    placeholder="Establishment amenities"
                    error={errors.amenities && <Error>{errors.amenities.message}</Error>} />

                {/* Submit Button */}    
                <div className="add-establishment__group--submit">
                    <SubmitButton theme="primary" size="sm">
                        {submitting ? "Adding..." : "Add Establishment"}
                    </SubmitButton>
                </div>

            </fieldset>
        </form>
    );
}

export default AddForm;