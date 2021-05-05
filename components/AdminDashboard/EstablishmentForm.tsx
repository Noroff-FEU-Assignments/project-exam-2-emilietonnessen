import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import * as regex from '../../constants/regex';
import useAxios from "../../hooks/useAxios.js";
import { ESTABLISHMENTS_URL } from "../../constants/api";
import Accordion from "../UI/Accordion";
import Select from "../UI/Form/Select";
import Input from "../UI/Form/Input";
import {Establishments} from './EditEstablishments';
import Textarea from "../UI/Form/Textarea";
import { SubmitButton } from "../UI/Button";

interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape({
    estaEstablishment: 
        yup.string()
        .required('Please enter your first name')
        .min(2, 'Please enter 5 or more letters'),
    estaEmail:
        yup.string()
        .required('Please enter a Email address')
        .matches(regex.email, 'Please enter a valid email address'),
    estaPhone:
        yup.string()
        .required('Please enter your first name')
        .min(4, 'Please enter 4 or more letters'),
    estaCoordinates:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters'),
    estaStreet:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters'),
    estaCity:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters'),
    estaZipCode:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters'),
    estaRating:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters'),
    estaStars:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters'),
    estaFeatured:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters'),
    estaDescription:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters'),
    estaAmenities:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters'),
});

interface EstablishmentFormProps {
    selectedEstablishment: any;
}

const EstablishmentForm: React.FC<EstablishmentFormProps> = ({ selectedEstablishment }) => {

    // Checking the props endpoints
    console.log("[selectedEstablishment]", selectedEstablishment);


    // State
	const [updated, setUpdated] = useState(false);
	const [updatingPost, setUpdatingPost] = useState(false);
	const [updateError, setUpdateError] = useState(null);


    

	const http = useAxios();
    let url = "";

    if (selectedEstablishment) url = ESTABLISHMENTS_URL + "/" + selectedEstablishment.id;
    
    //console.log("[url]", url);

    // Put together React Hook Form and Yup validation.
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    


    // OnSubmit
    async function onSubmit(data: any) {
        setUpdatingPost(true);
		setUpdateError(null);
		setUpdated(false);
		
        console.log(data);

		try {
			const response = await http.put(url, data);

            // Console log the data saved in the api
			console.log("[Response Data]", response.data);
            setUpdated(true);


		} catch (error) {
			console.log("[Error]", error);
			setUpdateError(error.toString());
		} finally {
			setUpdatingPost(false);
		}
    }

    //if (fetchingPost) return <div>Loading...</div>;

	


    return (
        <form  onSubmit={onSubmit}>
            {updated && <div className="success">The post was updated</div>}

			{updateError && <div>{updateError}</div>}

            <fieldset disabled={updatingPost} className="establishment-form">

                {/* Image 1: */}
                <Input 
                    register={register}
                    name="estaImageOne"
                    label="Image 1"
                    type="text"
                    error={errors.image && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.image.message}</span>}
                    placeholder="image url"
                    />

                    {/* Image 2: */}
                    <Input 
                        register={register}
                        name="estaImageTwo"
                        label="Image 2"
                        type="text"
                        error={errors.image && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.image.message}</span>}
                        placeholder="image url" />

                    {/* Image 3: */}
                    <Input 
                        register={register}
                        name="estaImageThree"
                        label="Image 3"
                        type="text"
                        error={errors.image && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.image.message}</span>}
                        placeholder="image url" />

                    {/* Hotel Name: */}
                    <Input 
                        register={register}
                        name="estaEstablishment"
                        label="Establishment Name"
                        type="text"
                        error={errors.establishment && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.establishment.message}</span>}
                        placeholder="Establishment Name"
                        defaultValue={selectedEstablishment ? selectedEstablishment.name : ""} />

                    {/* Category: */}
                    <Select 
                        name="estaCategory" 
                        label="Choose a Category"
                        register={register} 
                        error={errors.category && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.category.message}</span>}
                        defaultValue={selectedEstablishment ? selectedEstablishment.category : ""}  >
                              
                        <option value="Hotel">Hotel</option>
                        <option value="BedAndBreakfast">Bed & Breakfast</option>
                        <option value="Guesthouse">Guesthouse</option>
                    </Select>

                    {/* Email: */}
                    <Input
                        register={register}
                        name="estaEmail"
                        label="Email"
                        type="text"
                        error={errors.email && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.email.message}</span>}
                        placeholder="establishment@support.no"
                        defaultValue={selectedEstablishment ? selectedEstablishment.email : ""}
                         />

                    {/* Phone */}
                    <Input
                        register={register}
                        name="estaPhone"
                        label="Phone"
                        type="text"
                        error={errors.phone && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.phone.message}</span>}
                        placeholder="123 45 678"
                        defaultValue={selectedEstablishment ? selectedEstablishment.phone : ""} />

                    {/* Coordinates */}
                    <Input
                        register={register}
                        name="estaCoordinates"
                        label="coordinates"
                        type="text"
                        error={errors.coordinates && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.coordinates.message}</span>}
                        placeholder="establishment@support.no"
                        defaultValue={selectedEstablishment ? selectedEstablishment.address.coordinates : ""} />


                    {/* Street name */}
                    <Input
                        register={register}
                        name="estaStreet"
                        label="street"
                        type="text"
                        error={errors.street && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.street.message}</span>}
                        placeholder="Street Name 12"
                        defaultValue={selectedEstablishment ? selectedEstablishment.address.street : ""} />

                    {/* City */}
                    <Input
                        register={register}
                        name="estaCity"
                        label="city"
                        type="text"
                        error={errors.city && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.city.message}</span>}
                        placeholder="City"
                        defaultValue={selectedEstablishment ? selectedEstablishment.address.city : ""} />

                    {/* Zip Code */}
                    <Input
                        register={register}
                        name="estaZipCode"
                        label="zipCode"
                        type="text"
                        error={errors.zipCode && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.zipCode.message}</span>}
                        placeholder="1234"
                        defaultValue={selectedEstablishment ? selectedEstablishment.address.zipcode : ""} />

                    {/* Average User Rating */}
                    <Input
                        register={register}
                        name="estaRating"
                        label="rating"
                        type="text"
                        error={errors.rating && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.rating.message}</span>}
                        placeholder="7.9"
                        defaultValue={selectedEstablishment ? selectedEstablishment.rating : ""} />

                    {/* Stars */}
                    <Input
                        register={register}
                        name="estaStars"
                        label="stars"
                        type="text"
                        error={errors.stars && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.stars.message}</span>}
                        placeholder="4"
                        defaultValue={selectedEstablishment ? selectedEstablishment.stars : ""} />

                    {/* Featured */}
                    <Input
                        register={register}
                        name="estaFeatured"
                        label="featured"
                        type="text"
                        error={errors.featured && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.featured.message}</span>}
                        placeholder="true"
                        defaultValue={selectedEstablishment ? JSON.stringify(selectedEstablishment.featured) : ""} />

                    {/* Description */}
                    <Textarea
                        register={register}
                        name="estaDescription"
                        label="description"
                        placeholder="Establishment Description"
                        error={errors.description && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.description.message}</span>}
                        defaultValue={selectedEstablishment ? selectedEstablishment.description : ""}
                    />

                    {/* List of Amenities */}
                    <Textarea
                        register={register}
                        name="estaAmenities"
                        label="Amenities"
                        placeholder="Establishment amenities"
                        error={errors.amenities && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.amenities.message}</span>}
                        defaultValue={selectedEstablishment ? selectedEstablishment.amenities : ""}
                    />

                    <div className="booking-form__group--estaAdvanced">
                        {/* Advanced Options */}
                        <Accordion title="Advanced Options">
                            Delete this establishment
                        </Accordion>
                    </div>
                    
                <div className="booking-form__group--estaSubmit">
                    {/* Submit Button */}
                    <SubmitButton theme="primary" size="sm">
                        update establishment
                    </SubmitButton>
                </div>




            </fieldset>

                    


                    

        </form>
    )
}

export default EstablishmentForm
