import axios, { AxiosResponse } from 'axios';
import { Params } from 'next/dist/next-server/server/router';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GetStaticProps } from 'next';

import { ESTABLISHMENTS_URL, GRAPHQL_URL } from "../../constants/api";
import Layout from '../../components/Layout';
import Booking from '../../components/Booking';
import { BookingFeedbackSuccess, BookingFeedbackError } from '../../components/Booking/BookingFeedback';
import EstablishmentGallery from '../../components/Establihsment/EstablishmentGallery';
import EstablishmentHeader from '../../components/Establihsment/EstablishmentHeader';
import EstablishmentInfo from '../../components/Establihsment/EstablishmentInfo';
import EstablishmentCTA from '../../components/Establihsment/EstablishmentCTA';

// Interfaces
interface Address {
	coordinates: string;
	street: string;
	city: string;
	zipcode: number;
}

interface Gallery {
	alternativeText: string;
    height: number;
    width: number;
    url: string;
    id: string;
}

interface Establishment {
	id: number;
    slug: string;
    name: string;
	email: string;
	phone: number;
    stars: number;
	rating: number;
    featured: boolean;
    reviews: number;
    lowestPrice: string;
	description: string;
	amenities: string;
	address: Address;
	gallery: Gallery[];
}

interface EstablishmentDetailsProps {
	est: Establishment;
}




const establishmentDetails: React.FC<EstablishmentDetailsProps> = ({est}) => {

    return (
		<>
			<Layout page="establishment" title={`${est.name} | Holidaze`} description={est.description}>

				{/* Gallery: */}
				{/* <EstablishmentGallery gallery={est.gallery} /> */}

				{/* Header: */}
				{/* <EstablishmentHeader 
					name={est.name}
					street={est.address.street}
					stars={est.stars}
					reviews={est.reviews}
					rating={est.rating} /> */}

				{/* Information: */}
				{/* <EstablishmentInfo
					coordinates={est.address.coordinates} 
					description={est.description}
					amenities={est.amenities} />   */}

				{/* Booking */}
				<EstablishmentCTA />
				
			</Layout>


			{/* Booking Enquiry Modal: */}
			{/* <Booking
				email={est.email}
				phone={est.phone}
				street={est.address.street}
				city={est.address.city}
				zipcode={est.address.zipcode}
				establishment={est.name} /> */}

			{/* Booking Feedback */}
			<BookingFeedbackSuccess />
			<BookingFeedbackError />
		</>
    );
}

export default establishmentDetails;



// Get the slug from the API
export const getStaticPaths: () => Promise<{ paths: { params: { slug: string; }; }[]; fallback: boolean; } | undefined> = async () => {
	try {
		const response: AxiosResponse<any> = await axios.get(ESTABLISHMENTS_URL);
        const establishments: any[] = response.data;

		const paths: {params: {slug: string}}[]  = establishments.map((est) => ({
			params:  { 
				slug: est.slug.toString(),
			},
		}));

		return { 
            paths: paths, 
            fallback: false 
        };

	} catch (error) {
		console.log('[Error getStaticPaths]', error);
	}
}



// Based on the acquired slug - the graphQL will pick up the necessary endpoints
export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
	let slug: string | string[] | undefined;
    
	// Going around a TS error that didn't liked that the value could be "undefined"
	if (params) {
		slug = params.slug;
	}

	let establishment: Establishment[] = [];

	const client = new ApolloClient({
        uri: GRAPHQL_URL,
        cache: new InMemoryCache
    });

	// Fetching the needed endpoints based on the slug
	const { data } = await client.query({
        query: gql` query  {
            establishments (where: {slug: "${slug}"}) {
                id
                slug
                name
                stars
				rating
                featured
                reviews
                lowestPrice
				description
				email
				phone
				category
				amenities
				
				coordinates
				street
				zipcode
				city
				
				
                    
            }                   
    	}`
	});

	establishment = data.establishments;


	return {
		props: { 
            est: establishment[0]
        },
	};
} 