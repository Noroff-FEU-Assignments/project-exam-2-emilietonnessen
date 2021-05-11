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

interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape(
    editEstablishmentSchema
);

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
	const [updateError, setUpdateError] = useState(null);
    


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
		
        console.log(data);
        //console.log("[Url]", url)

		try {
			const response = await http.put(url, data);

            // Console log the data saved in the api
			console.log("[Response Data]", response.data);
            setUpdated(true);
		} catch (error) {
			console.log("[OnSubmit Error]", error);
			setUpdateError(error.toString());
		} finally {
			setUpdatingEstablishment(false);
		}
    }



    // Console Logging
    //console.log("[url]", url);
    //console.log("[Match Establishment]", matchEstablishment);
	//console.log("[Establishments]", establishments);
    //console.log("[Selected Establishment]", selectedEstablishment);
    //console.log("[Errors]", errors);
    if (selectedEstablishment) console.log("[Thumbnail Url]", selectedEstablishment.thumbnail.url);
    

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>

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
            <fieldset disabled={updatingEstablishment} className="establishment-form">

                {/* Image 1 (Thumbnail): */}
                <Input 
                    register={register}
                    name="thumbnail.url"
                    cssClass="establishment-form__group--image-1"
                    label="Thumbnail"
                    type="text"
                    error={errors.thumbnail && <Error>{errors.thumbnail.url ? errors.thumbnail.url.message : null}</Error>}
                    placeholder="image url"
                    defaultValue={selectedEstablishment ? selectedEstablishment.thumbnail.url : ""} /> 

                {/* Image 2: */}
                 <Input 
                    register={register}
                    name="imageOne.url"
                    cssClass="establishment-form__group--image-2"
                    label="Image 1"
                    type="text"
                    error={errors.imageOne && <Error>{errors.imageOne.url ? errors.imageOne.url.message : null}</Error>}
                    placeholder="image url"
                    defaultValue={selectedEstablishment ? selectedEstablishment.imageOne.url : ""} />

                {/* Image 3: */}
                <Input 
                    register={register}
                    name="imageTwo.url"
                    cssClass="establishment-form__group--image-3"
                    label="Image 2"
                    type="text"
                    error={errors.imageTwo && <Error>{errors.imageTwo.url ? errors.imageTwo.url.message : null}</Error>}
                    placeholder="image url"
                    defaultValue={selectedEstablishment ? selectedEstablishment.imageTwo.url : ""} /> 

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

                {/* Advanced Options */}
                <div className="establishment-form__group--advanced">
                    <Accordion title="Advanced Options">
                        Delete this establishment
                    </Accordion>
                </div>

                {/* Submit Button */}    
                <div className="establishment-form__group--submit">
                    <SubmitButton theme="primary" size="sm">
                        update establishment
                    </SubmitButton>
                </div> 

            </fieldset>
        </form>
    );
}

export default EditForm;