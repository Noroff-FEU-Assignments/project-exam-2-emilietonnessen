import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import useAxios from "../../../hooks/useAxios.js";
import { ESTABLISHMENTS_URL } from "../../../constants/api";
import Accordion from "../../UI/Accordion";
import Select from "../../UI/Form/Select";
import Input from "../../UI/Form/Input";
import Textarea from "../../UI/Form/Textarea";
import { SubmitButton } from "../../UI/Button";
import Error from "../../UI/Form/Error";
import { editEstablishmentSchema } from '../../../constants/schemas';
import { Establishment } from '../../../constants/interfaces';
import File from "../../UI/Form/File";
import * as regex from '../../../constants/regex';
import AdvancedOptions from "./AdvancedOptions";

interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape({
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

const EditForm: React.FC = () => {

    // Put together React Hook Form and Yup validation.
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    // State
    const [establishments, setEstablishments] = useState<Establishment[] | undefined>();
    const [matchEstablishment, setMatchEstablishment] = useState<string | undefined>();
	const [updated, setUpdated] = useState<boolean>(false);
	const [updatingEstablishment, setUpdatingEstablishment] = useState<boolean>(false);
	const [updateError, setUpdateError] = useState<any>(null);
    const [thumbnailValue, setThumbnailValue] = useState<any>(null);
    const [thumbnailValueError, setThumbnailValueError] = useState<any>(false);
    const [imageOneValue, setImageOneValue] = useState<any>(null);
    const [imageOneValueError, setImageOneValueError] = useState<any>(null);
    const [imageTwoValue, setImageTwoValue] = useState<any>(null);
    const [imageTwoValueError, setImageTwoValueError] = useState<any>(null);


    // Variables
    const http = useAxios();
    let establishmentOptions;
    let selectedEstablishment: any;
    let url: string = "";


    // Set all the Establishments from the API
     useEffect(() => {
        async function fetchData() {
            try {
                const response = await http.get("establishments");
				setEstablishments(response.data);
            } catch (error) {
                console.log(error)
            }
        }; fetchData(); 
    }, []);

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



    // Set the Matching Establishment
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatchEstablishment(event.target.value);
    }



    // Set the selected establishment to match the search
    if (establishments != undefined && matchEstablishment != null && establishments.length > 0) {
        selectedEstablishment = establishments.filter(esta => esta.name.match(matchEstablishment)); 
    };

    if (selectedEstablishment != undefined && selectedEstablishment.length === 1) selectedEstablishment = selectedEstablishment[0];
    
    if (selectedEstablishment != undefined ) url = ESTABLISHMENTS_URL + "/" + selectedEstablishment.id;


    

    // Get the Establishments API and map through the establishments
    if (establishments) {
        establishmentOptions = establishments.map(est => (
            <option key={est.id} value={est.name}>{est.name}</option>
        ));
    }
    
 

    // OnSubmit
    async function onSubmit(data: any) {
        setUpdatingEstablishment(true);
		setUpdateError(null);
		setUpdated(false);
		
        console.log("[Data Sending]", data);

        const formData = new FormData()
        formData.append("data", JSON.stringify(data));
        formData.append("files.thumbnail", thumbnailValue);
        formData.append("files.imageOne", imageOneValue);
        formData.append("files.imageTwo", imageTwoValue); 

		try {
            if (thumbnailValue != null && imageOneValue != null && imageTwoValue != null) {
                const response = await http.put(url, formData);

                // Console log the data saved in the api
                console.log("[Response Data]", response.data);
                setUpdated(true);

            } else {
                setThumbnailValueError(true);
                setImageOneValueError(true);
                setImageTwoValueError(true);
                setUpdateError("Please Choose images to be used!");
            }
			
		} catch (error) {
			console.log("[OnSubmit Error]", error);
			setUpdateError(error.toString());
		} finally {
			setUpdatingEstablishment(false);
		}
    }



    // Console Logging
    console.log("[url]", url);
    //console.log("[Match Establishment]", matchEstablishment);
	//console.log("[Establishments]", establishments);
    //console.log("[Selected Establishment]", selectedEstablishment);
    //console.log("[Errors]", errors);
    //if (selectedEstablishment) console.log("[Thumbnail Url]", selectedEstablishment.thumbnail.url);
    

    return (
        <>
        <form  onSubmit={handleSubmit(onSubmit)} className="establishment-form">

            {/* Select an Establishment */}
            <Select 
                onChange={changeHandler}
                name="establishment" 
                cssClass="establishment-form__group--establishment"
                label="Choose an establishment" 
                register={register} 
                error={errors.establishment && <Error>{errors.establishment.message}</Error>} >

                {establishmentOptions}
            </Select>

            {/* Feedback on the Update */}
            {updated && <div className="feedback--success">The Establishment was successfully updated!</div>}
            {updateError && <div className="feedback--error">{updateError}</div>}


            {/* Form: */}
            <fieldset disabled={updatingEstablishment} className="establishment-form__fieldset">

                {/* Thumbnail: */}
                <File 
                    name="thumbnail" label="Thumbnail"  onChange={changeThumbnailValue}  
                    cssClass="establishment-form__group--thumbnail"
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
                    register={register}
                    name="name"
                    cssClass="establishment-form__group--name"
                    label="Establishment Name"
                    type="text"
                    error={errors.name && <Error>{errors.name.message}</Error>}
                    placeholder="Establishment Name"
                    defaultValue={selectedEstablishment ? selectedEstablishment.name : ""}  />

                {/* Category: */}
                <Select 
                    name="category" 
                    cssClass="establishment-form__group--category"
                    label="Choose a Category"
                    register={register} 
                    error={errors.category && <Error>{errors.category.message}</Error>}
                    defaultValue={selectedEstablishment ? selectedEstablishment.category : ""} >
                              
                    <option value="Hotel">Hotel</option>
                    <option value="BedAndBreakfast">Bed & Breakfast</option>
                    <option value="Guesthouse">Guesthouse</option>
                </Select>

                {/* Email: */}
                <Input
                    register={register}
                    name="email"
                    cssClass="establishment-form__group--email"
                    label="Email"
                    type="text"
                    error={errors.email && <Error>{errors.email.message}</Error>}
                    placeholder="establishment@support.no"
                    defaultValue={selectedEstablishment ? selectedEstablishment.email : ""} />

                {/* Phone */}
                <Input
                    register={register}
                    name="phone"
                    cssClass="establishment-form__group--phone"
                    label="Phone"
                    type="text"
                    error={errors.phone && <Error>{errors.phone.message}</Error>}
                    placeholder="123 45 678"
                    defaultValue={selectedEstablishment ? selectedEstablishment.phone : ""} />


                {/* Coordinates */}
                <Input
                    register={register}
                    name="coordinates"
                    cssClass="establishment-form__group--coordinates"
                    label="Coordinates"
                    type="text"
                    error={errors.coordinates && <Error>{errors.coordinates.message}</Error>}
                    placeholder="latitude, longitude"
                    defaultValue={selectedEstablishment ? selectedEstablishment.coordinates : ""} />


                {/* Street name */}
                <Input
                    register={register}
                    name="street"
                    cssClass="establishment-form__group--street"
                    label="Street"
                    type="text"
                    error={errors.street && <Error>{errors.street.message}</Error>}
                    placeholder="Street Name 12"
                    defaultValue={selectedEstablishment ? selectedEstablishment.street : ""} />

                {/* City */}
                <Input
                    register={register}
                    name="city"
                    cssClass="establishment-form__group--city"
                    label="City"
                    type="text"
                    error={errors.city && <Error>{errors.city.message}</Error>}
                    placeholder="City Name"
                    defaultValue={selectedEstablishment ? selectedEstablishment.city : ""} />

                {/* Zip Code */}
                <Input
                    register={register}
                    name="zipCode"
                    cssClass="establishment-form__group--zip-code"
                    label="Zip Code"
                    type="text"
                    error={errors.zipCode && <Error>{errors.zipCode.message}</Error>}
                    placeholder="1234"
                    defaultValue={selectedEstablishment ? selectedEstablishment.zipCode : ""} />

                {/* Average User Rating */}
                <Input
                    register={register}
                    name="rating"
                    cssClass="establishment-form__group--rating"
                    label="User Rating"
                    type="text"
                    error={errors.rating && <Error>{errors.rating.message}</Error>}
                    placeholder="Ex: 7.9"
                    defaultValue={selectedEstablishment ? selectedEstablishment.rating : ""} />

                {/* Stars */}
                <Input
                    register={register}
                    name="stars"
                    cssClass="establishment-form__group--stars"
                    label="Stars"
                    type="text"
                    error={errors.rating && <Error>{errors.rating.message}</Error>}
                    placeholder="4"
                    defaultValue={selectedEstablishment ? selectedEstablishment.stars : ""} />

                {/* Featured */}
                <Input
                    register={register}
                    name="featured"
                    cssClass="establishment-form__group--featured"
                    label="Featured"
                    type="text"
                    error={errors.featured && <Error>{errors.featured.message}</Error>}
                    placeholder="true"
                    defaultValue={selectedEstablishment ? JSON.stringify(selectedEstablishment.featured) : ""} />

                {/* Description */}
                <Textarea
                    register={register}
                    name="description"
                    cssClass="establishment-form__group--description"
                    label="Description"
                    placeholder="Establishment Description"
                    error={errors.description && <Error>{errors.description.message}</Error>}
                    defaultValue={selectedEstablishment ? selectedEstablishment.description : ""} />

                {/* List of Amenities */}
                <Textarea
                    register={register}
                    name="amenities"
                    cssClass="establishment-form__group--amenities"
                    label="Amenities"
                    placeholder="Establishment amenities"
                    error={errors.amenities && <Error>{errors.amenities.message}</Error>}
                    defaultValue={selectedEstablishment ? selectedEstablishment.amenities : ""} />

                

                {/* Submit Button */}    
                <div className="establishment-form__group--submit">
                    <SubmitButton theme="primary" size="sm">
                        {updatingEstablishment ? "updating.." : "update establishment"}
                    </SubmitButton>
                </div> 

            </fieldset>

            

        </form>

        {/* Advanced Options */}
        <AdvancedOptions url={url} />
        </>
    );
}

export default EditForm;