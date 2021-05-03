import * as yup from "yup";
import { Asserts } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup.d";
import { useEffect, useState } from "react";

import * as regex from '../../constants/regex';
import useAxios from "../../hooks/useAxios.js";
import { ESTABLISHMENTS_URL } from "../../constants/api";
import Accordion from "../UI/Accordion";
import Select from "../UI/Form/Select";

interface Address {
    city: string;
    coordinates: string;
    establishment: number;
    id: number;
    name: string;
    street: string;
}

interface Gallery {
    alternativeText: string;
    height: number;
    width: number;
    id: number;
    url: string;
}



interface Establishments {
    address: Address;
    amenities: string;
    category: string;
    created_at: string;
    description: string;
    email: string;
    featured: boolean;
    gallery: Gallery[];
    id: number;
    lowestPrice: string;
    name: string;
    phone: number;
    published_at: string;
    rating: number;
    reviews: string;
    slug: string;
    stars: number;
    updated_at: string;
}


interface Schema extends Asserts<typeof schema> {}

const schema = yup.object().shape({
    establishment: 
        yup.string()
        .required('Please enter your first name')
        .min(2, 'Please enter 5 or more letters'),
    email:
        yup.string()
        .required('Please enter a Email address')
        .matches(regex.email, 'Please enter a valid email address'),
    topic:
        yup.string()
        .required('Please enter your first name')
        .min(4, 'Please enter 4 or more letters'),
    message:
        yup.string()
        .required('Please write a message')
        .min(10, 'Please write a message with at least 10 letters')
});

const EditEstablishment = () => {
    const [establishments, setEstablishments] = useState<Establishments[]>([]);
    const [selected, setSelected]: any = useState();

    const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);
	const http = useAxios();

    // Put together React Hook Form and Yup validation.
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    // Set Establishment
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

    //console.log("[Establishments]", establishments);

    // OnSubmit
    async function onSubmit(data: any) {
        setSubmitting(true);
		setServerError(null);
        
        // Adds the current Establishment to the Enquiry Data
        //data.establishment = establishment;
		
        console.log(data);

		try {
			const response = await http.post(ESTABLISHMENTS_URL, data);

            // Console log the data saved in the api
			console.log("[ESTABLISHMENTS]", response.data);

            // Close Booking Modal and open Feedback Modal
            window.location.href="#feedback-success"
            


		} catch (error) {
			console.log("[Error]", error);
			setServerError(error.toString());

            // Move to feedback Error
            window.location.href="#feedback-error"
		} finally {
			setSubmitting(false);
		}
    }

    const establishmentOptions = establishments.map(est => (
        <option key={est.id} value={est.name}>{est.name}</option>
    ));
 

    const changeHandler = (event) => {
        setSelected(event.target.value);
    }

    let selectedEstablishment;

    if (selected != undefined) {
        let search: string = selected;
        console.log("[Search]", search);
        
        
        if (search.length > 0) {
            

            //console.log("not null or undefined");
            if( search != null) {

                search = selected;
                console.log("[Search]", search);

                selectedEstablishment = establishments.filter(est => {
                    //console.log(est.name);
                    return est.name.match(search);
                }); 
            }
            
        }
    
    }
    

    

    /* if (selected) {
        search = selected.trim().toLowerCase();
    } */
    
    
    

   /*  const selectedEstablishment = establishments.map(est => {
        console.log(est)
    }) */

    //console.log(selectedEstablishment);
    console.log("[Selected Establishment]:", selectedEstablishment);


    return (
        <section className="edit-establishment">
            <Accordion title="Edit Establishment">

                {/* Select an Establishment */}
                <Select 
                    onChange={changeHandler}
                    name="establishment" 
                    label="Choose an establishment" 
                    register={register} 
                    error={errors.establishment && <span className="form__error"><i className="fas fa-exclamation-circle"></i> {errors.establishment.message}</span>} >


                    {establishmentOptions}
                </Select>

                {/* Based on the information we get from the select - Fill in the form details of that particular establishment */}

            </Accordion>        
        </section>
    );
}

export default EditEstablishment;