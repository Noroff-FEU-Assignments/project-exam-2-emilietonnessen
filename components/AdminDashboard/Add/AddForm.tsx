import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { NextRouter, useRouter } from "next/router";


import * as regex from '../../../constants/regex';
import useAxios from "../../../hooks/useAxios";
import { ESTABLISHMENTS_URL } from "../../../constants/api";
import Error from "../../UI/Form/Error";
import Input from "../../UI/Form/Input";
import Select from "../../UI/Form/Select";
import Textarea from "../../UI/Form/Textarea";
import { SubmitButton } from "../../UI/Button";
import AuthContext from "../../../context/AuthContext";
import File from '../../UI/Form/File';
import RadioFeatured from "../../UI/Form/RadioFeatured";
import {addEstablishmentSchema} from '../../../constants/schemas';

interface Schema extends yup.Asserts<typeof schema> {}

const schema = yup.object().shape(addEstablishmentSchema);

const AddForm: React.FC = () => {

    // Put together React Hook Form and Yup validation.
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });
    
    // Variables
    const [auth] = useContext<any>(AuthContext);

    // State
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [added, setAdded] = useState<boolean>(false);

    const [thumbnailValue, setThumbnailValue] = useState<any>(null);
    const [thumbnailValueError, setThumbnailValueError] = useState<any>(false);
    const [imageOneValue, setImageOneValue] = useState<any>(null);
    const [imageOneValueError, setImageOneValueError] = useState<any>(null);
    const [imageTwoValue, setImageTwoValue] = useState<any>(null);
    const [imageTwoValueError, setImageTwoValueError] = useState<any>(null);

    

    // Image values
    const changeThumbnailValue = async (event: any) => {
        setThumbnailValueError(false);
    
        if (event.target.files[0].type === "image/jpeg") {
            setThumbnailValue(event.target.files[0]); 
        }  else {
            setThumbnailValueError(true);
            setThumbnailValue(null);
        }
    }

    const changeImageOneValue = (event: any) => {
        setImageOneValueError(false);
    
        if (event.target.files[0].type === "image/jpeg") {
            setImageOneValue(event.target.files[0]); 
        }  else {
            setImageOneValueError(true);
            setImageOneValue(null);
        }
    }
    
    const changeImageTwoValue = (event: any) => {
        setImageTwoValueError(false);
    
        if (event.target.files[0].type === "image/jpeg") {
            setImageTwoValue(event.target.files[0]); 
        }  else {
            setImageTwoValueError(true);
            setImageTwoValue(null);
        }
    }
    

    // Onsubmit
    async function onSubmit(data: any) {
        setSubmitting(true);
        setServerError(null);
        setAdded(false);

        // Append the Images to the data with formData
        const formData = new FormData()
        formData.append("data", JSON.stringify(data));
        formData.append("files.thumbnail", thumbnailValue);
        formData.append("files.imageOne", imageOneValue);
        formData.append("files.imageTwo", imageTwoValue); 

        try {

            if (thumbnailValue != null && imageOneValue != null && imageTwoValue != null) {
                const response = await fetch (ESTABLISHMENTS_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${auth.jwt}`,
                    },
                    
                    body: formData
                });

                const data = await response.json();

                setAdded(true);
            } else {
                setThumbnailValueError(true);
                setImageOneValueError(true);
                setImageTwoValueError(true);
                setServerError("Please Choose images to be used!");
            }
        } catch (error) {
            setServerError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    // Console Logs
    //console.log("[Auth Key]", auth.jwt);
    //console.log("[thumbnailValue]", thumbnailValue);

    return (
        <form className="establishment-form" onSubmit={handleSubmit(onSubmit)}>

            {/* Feedback: */}
            {serverError && <div className="feedback--error">{serverError}</div>}
            {added && <div className="feedback--success">The Establishment was successfully added!</div>}

            <fieldset disabled={submitting} className="establishment-form__fieldset">

                {/* Thumbnail */}
                <File 
                    name="thumbnail" label="Thumbnail"  onChange={changeThumbnailValue}  
                    cssClass="establishment-form__group--thumbnail" /* register={register} */
                    error={thumbnailValueError ? "Please use an .jpeg file" : null}  />


                {/* Image 1: */}
                <File 
                    name="imageOne" label="Image 1" onChange={changeImageOneValue} 
                    cssClass="establishment-form__group--image-1" /* register={register} */
                    error={imageOneValueError ? "Please use an .jpeg file" : null}/>


                {/* Image 2: */}
                <File 
                    name="imageTwo" label="Image 2" onChange={changeImageTwoValue} 
                    cssClass="establishment-form__group--image-2" /* register={register} */
                    error={imageTwoValueError ? "Please use an .jpeg file" : null}/>


                {/* Hotel Name: */}
                <Input 
                    name="name" label="Establishment Name" register={register}
                    cssClass="establishment-form__group--name" type="text"
                    placeholder="My Beautiful Establishment"
                    error={errors.name && <Error>{errors.name.message}</Error>} />


                {/* Category: */}
                <Select 
                    name="category" label="Choose a Category" register={register} 
                    cssClass="establishment-form__group--category"
                    error={errors.category && <Error>{errors.category.message}</Error>} >
                              
                    <option value="Hotel">Hotel</option>
                    <option value="BedAndBreakfast">Bed & Breakfast</option>
                    <option value="Guesthouse">Guesthouse</option>
                </Select>

                {/* Email: */}
                <Input
                    name="email" label="Email" register={register}
                    cssClass="establishment-form__group--email" type="text"
                    placeholder="establishment@support.no"
                    error={errors.email && <Error>{errors.email.message}</Error>} />

                {/* Phone */}
                <Input
                    name="phone" label="Phone" register={register}
                    cssClass="establishment-form__group--phone" type="text"
                    placeholder="123 45 678"
                    error={errors.phone && <Error>{errors.phone.message}</Error>} />


                {/* Coordinates */}
                <Input
                    name="coordinates" label="Coordinates" register={register}
                    cssClass="establishment-form__group--coordinates"
                    placeholder="60.10000, 65.2000" type="text"
                    error={errors.coordinates && <Error>{errors.coordinates.message}</Error>} />


                {/* Street name */}
                <Input
                    name="street" label="Street" register={register}
                    cssClass="establishment-form__group--street" type="text"
                    placeholder="Street Name 12"
                    error={errors.street && <Error>{errors.street.message}</Error>} />


                {/* City */}
                <Input
                    name="city" label="City" register={register}
                    cssClass="establishment-form__group--city" type="text"
                    placeholder="City Name"
                    error={errors.city && <Error>{errors.city.message}</Error>} />

                {/* Zip Code */}
                <Input
                    register={register}
                    name="zipCode"
                    cssClass="establishment-form__group--zip-code"
                    label="Zip Code"
                    type="text"
                    error={errors.zipCode && <Error>{errors.zipCode.message}</Error>}
                    placeholder="1234" />

                {/* Average User Rating */}
                <Input
                    register={register}
                    name="rating"
                    cssClass="establishment-form__group--rating"
                    label="User Rating"
                    type="text"
                    error={errors.rating && <Error>{errors.rating.message}</Error>}
                    placeholder="Ex: 7.9" />

                {/* Stars */}
                <Input
                    register={register}
                    name="stars"
                    cssClass="establishment-form__group--stars"
                    label="Stars"
                    type="text"
                    error={errors.stars && <Error>{errors.stars.message}</Error>}
                    placeholder="4" />

                {/* Lowest Price: */}
                <Input
                    register={register}
                    name="lowestPrice"
                    cssClass="establishment-form__group--lowest-price"
                    label="Lowest Room Price"
                    type="text"
                    error={errors.lowestPrice && <Error>{errors.lowestPrice.message}</Error>}
                    placeholder="499" />

                {/* Reviews: */}
                <Input
                    register={register}
                    name="reviews"
                    cssClass="establishment-form__group--reviews"
                    label="Amount of reviews"
                    type="text"
                    error={errors.reviews && <Error>{errors.reviews.message}</Error>}
                    placeholder="456" />

                {/* Featured */}
                <div className="form__group establishment-form__group--featured">

                    {/* Form Label: */}
                    <label className="form__label">Featured</label>

                    {/* True/Featured Option */}
                    <div className="form__radio-group">
                        <input 
                            ref={register} 
                            name="featured" 
                            type="radio" 
                            id="radio-true" 
                            className="form__radio "
                            //checked
                            value="true" />
                        <label htmlFor="radio-true" className="form__radio-label">Yes</label>
                    </div>

                    {/* False/Not Featured Option */}
                    <div className="form__radio-group">
                        <input 
                            ref={register} 
                            name="featured" 
                            type="radio" 
                            id="radio-false" 
                            className="form__radio "
                            //checked={checked} 
                            value="false" />
                        <label htmlFor="radio-false" className="form__radio-label">No</label>
                    </div>
                    
                    {/* Error: */}
                    {errors.featured && <Error>{errors.featured.message}</Error>}
                </div>

                {/* Description */}
                <Textarea
                    register={register}
                    name="description"
                    cssClass="establishment-form__group--description"
                    label="Description"
                    placeholder="Establishment Description"
                    error={errors.description && <Error>{errors.description.message}</Error>} />

                {/* List of Amenities */}
                <Textarea
                    register={register}
                    name="amenities"
                    cssClass="establishment-form__group--amenities"
                    label="Amenities"
                    placeholder="Establishment amenities"
                    error={errors.amenities && <Error>{errors.amenities.message}</Error>} />

                {/* Submit Button */}    
                <div className="establishment-form__group--submit">
                    <SubmitButton theme="primary" size="sm">
                        {submitting ? "Adding..." : "Add Establishment"}
                    </SubmitButton>
                </div>

            </fieldset>
        </form>
    );
}

export default AddForm;