import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import * as regex from '../../../constants/regex';
import useAxios from "../../../hooks/useAxios.js";
import { ESTABLISHMENTS_URL } from "../../../constants/api";
import Accordion from "../../UI/Accordion";
import Select from "../../UI/Form/Select";
import Input from "../../UI/Form/Input";
import Textarea from "../../UI/Form/Textarea";
import { SubmitButton } from "../../UI/Button";
import Error from "../../UI/Form/Error";

interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape({
    /* establishment: 
        yup.string()
        .required('Please choose an establishment to edit'), */

    /* thumbnail: yup.object().shape({
        url: yup.string().required("use url"),
    }),
    imageOne: yup.object().shape({
        url: yup.string().required("use url"),
    }),
    imageTwo: yup.object().shape({
        url: yup.string().required("use url"),
    }), */

    name: 
        yup.string()
        .required('Please enter the name of the establishment'),
    category: 
        yup.string()
        .required('Please choose a category'),
    email:
        yup.string()
        .required('Please enter a Email address')
        .matches(regex.email, 'Please enter a valid email address'),
    phone:
        yup.string()
        .required('Please enter a phone number'),
    coordinates:
        yup.string()
        .required('Please enter coordinates'),
    street:
        yup.string()
        .required('Please write a street'),
    city:
        yup.string()
        .required('Please write a city'),
    zipCode:
        yup.string()
        .required('Please write a zip code'),
    rating:
        yup.number()
        .required('Please write the average user rating'),
    stars:
        yup.number()
        .required('Please write the amount of stars'),
    featured:
        yup.boolean()
        .required('Please chose of the establishment should be featured'),
    description:
        yup.string()
        .required('Please write a description'),
    amenities:
        yup.string()
        .required('Please write different amenities'),
});

interface Establishment {
    name: string;
    length: number;
    id: number;
    category: string;
    description: string;
    email: string;
    featured: boolean;
    rating: number;
    stars: number;
    lowestPrice: string;
    slug: string;
    reviews: string;
}

interface Establishments {
    establishment: Establishment[];
    length: number;
}

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
    console.log("[url]", url);
    //console.log("[Match Establishment]", matchEstablishment);
	//console.log("[Establishments]", establishments);
    console.log("[Selected Establishment]", selectedEstablishment);

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>

                {/* Select an Establishment */}
                <Select 
                    onChange={changeHandler}
                    name="establishment" 
                    cssClass="establishment-form__group--establishment"
                    label="Choose an establishment" 
                    register={register} 
                    error={errors.establishment && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.establishment.message}</span>} >

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
                        error={errors.imageOne && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.imageOne.message}</span>}
                        placeholder="image url"
                        defaultValue={selectedEstablishment ? selectedEstablishment.thumbnail.url : ""} />

                    {/* Image 2: */}
                    <Input 
                        register={register}
                        name="imageOne.url"
                        cssClass="establishment-form__group--image-2"
                        label="Image 1"
                        type="text"
                        error={errors.imageTwo && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.imageTwo.message}</span>}
                        placeholder="image url"
                        defaultValue={selectedEstablishment ? selectedEstablishment.imageOne.url : ""} />

                    {/* Image 3: */}
                    <Input 
                        register={register}
                        name="imageTwo.url"
                        cssClass="establishment-form__group--image-3"
                        label="Image 2"
                        type="text"
                        error={errors.imageThree && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.imageThree.message}</span>}
                        placeholder="image url"
                        defaultValue={selectedEstablishment ? selectedEstablishment.imageTwo.url : ""} />

                    {/* Hotel Name: */}
                    <Input 
                        register={register}
                        name="name"
                        cssClass="establishment-form__group--name"
                        label="Establishment Name"
                        type="text"
                        error={errors.name && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.name.message}</span>}
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
                        error={errors.email && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.email.message}</span>}
                        placeholder="establishment@support.no"
                        defaultValue={selectedEstablishment ? selectedEstablishment.email : ""} />

                    {/* Phone */}
                    <Input
                        register={register}
                        name="phone"
                        cssClass="establishment-form__group--phone"
                        label="Phone"
                        type="text"
                        error={errors.phone && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.phone.message}</span>}
                        placeholder="123 45 678"
                        defaultValue={selectedEstablishment ? selectedEstablishment.phone : ""} />

                    {/* Coordinates */}
                    <Input
                        register={register}
                        name="coordinates"
                        cssClass="establishment-form__group--coordinates"
                        label="Coordinates"
                        type="text"
                        error={errors.coordinates && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.coordinates.message}</span>}
                        placeholder="latitude, longitude"
                        defaultValue={selectedEstablishment ? selectedEstablishment.coordinates : ""} />


                    {/* Street name */}
                    <Input
                        register={register}
                        name="street"
                        cssClass="establishment-form__group--street"
                        label="Street"
                        type="text"
                        error={errors.street && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.street.message}</span>}
                        placeholder="Street Name 12"
                        defaultValue={selectedEstablishment ? selectedEstablishment.street : ""} />

                    {/* City */}
                    <Input
                        register={register}
                        name="city"
                        cssClass="establishment-form__group--city"
                        label="City"
                        type="text"
                        error={errors.city && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.city.message}</span>}
                        placeholder="City Name"
                        defaultValue={selectedEstablishment ? selectedEstablishment.city : ""} />

                    {/* Zip Code */}
                    <Input
                        register={register}
                        name="zipCode"
                        cssClass="establishment-form__group--zip-code"
                        label="Zip Code"
                        type="text"
                        error={errors.zipCode && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.zipCode.message}</span>}
                        placeholder="1234"
                        defaultValue={selectedEstablishment ? selectedEstablishment.zipCode : ""} />

                    {/* Average User Rating */}
                    <Input
                        register={register}
                        name="rating"
                        cssClass="establishment-form__group--rating"
                        label="User Rating"
                        type="text"
                        error={errors.rating && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.rating.message}</span>}
                        placeholder="Ex: 7.9"
                        defaultValue={selectedEstablishment ? selectedEstablishment.rating : ""} />

                    {/* Stars */}
                    <Input
                        register={register}
                        name="stars"
                        cssClass="establishment-form__group--stars"
                        label="Stars"
                        type="text"
                        error={errors.rating && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.rating.message}</span>}
                        placeholder="4"
                        defaultValue={selectedEstablishment ? selectedEstablishment.stars : ""} />

                    {/* Featured */}
                    <Input
                        register={register}
                        name="featured"
                        cssClass="establishment-form__group--featured"
                        label="Featured"
                        type="text"
                        error={errors.featured && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.featured.message}</span>}
                        placeholder="true"
                        defaultValue={selectedEstablishment ? JSON.stringify(selectedEstablishment.featured) : ""} />

                    {/* Description */}
                    <Textarea
                        register={register}
                        name="description"
                        cssClass="establishment-form__group--description"
                        label="Description"
                        placeholder="Establishment Description"
                        error={errors.description && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.description.message}</span>}
                        defaultValue={selectedEstablishment ? selectedEstablishment.description : ""} />

                    {/* List of Amenities */}
                    <Textarea
                        register={register}
                        name="amenities"
                        cssClass="establishment-form__group--amenities"
                        label="Amenities"
                        placeholder="Establishment amenities"
                        error={errors.amenities && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.amenities.message}</span>}
                        defaultValue={selectedEstablishment ? selectedEstablishment.amenities : ""} />

                    <div className="establishment-form__group--advanced">
                        {/* Advanced Options */}
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