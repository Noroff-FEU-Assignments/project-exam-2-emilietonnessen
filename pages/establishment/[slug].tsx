import Image from 'next/image';
import axios, { AxiosResponse } from 'axios';
import { Params } from 'next/dist/next-server/server/router';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GetStaticProps } from 'next';
import { ESTABLISHMENTS_URL, GRAPHQL_URL } from "../../constants/api";
import { ModalButton } from '../../components/UI/Button';
import Layout from '../../components/Layout';
import Details from '../../components/Details';
import Rooms from '../../components/Rooms';
import EstablishmentReviews from '../../components/EstablishmentReviews';
import BookingEnquiry from '../../components/BookingEnquiry';
import Head from 'next/head';

interface Address {
	coordinates: string;
	street: string;
	city: string;
	zipcode: number;
}

interface Gallery {
	id: number;
	alternativeText: string;
	url: string;
	width: string;
	height: string;
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
    reviews: string;
    lowestPrice: string;
	description: string;
	amenities: string;
	address: Address;
	gallery: Gallery[];
}

interface EstablishmentDetailsProps {
	est: {
		id: number;
        slug: string;
        name: string;
		email: string;
		phone: number;
        stars: number;
		rating: number;
        featured: boolean;
        reviews: string;
        lowestPrice: string;
		description: string;
		amenities: string;
		address: Address;
		gallery: Gallery[];
	};
}

const establishmentDetails: React.FC<EstablishmentDetailsProps> = ({est}) => {
	
	//console log the establishment endpoints
	//console.log('[EST]', est);
	console.log('[Establishment Name]', est.name);

	// Format the gallery into a JSX element
	const gallery = est.gallery;
	const formattedGallery: JSX.Element[] = gallery.map(img => (
		<div className="establishment-gallery__box" key={img.id}>
			<Image 
				className="establishment-gallery__img"
				src={img.url} 
				alt={img.alternativeText} 
				layout="responsive" 
				width={img.width} 
				height={img.height}  />
		</div>
	)); 

	// Calculate the amount of stars that shall be displayed
	const n: number = est.stars;
    const calculatedStars: JSX.Element[] = [...Array(n)].map((e, i) => (
        <Image 
			key={i} 
			src="/assets/icons/star-solid-primary.svg" 
			alt="star" 
			layout="intrinsic" 
			width={22} 
			height={22} />
    ));

	// Removing any spaces in the coordinates
	const coordinates: string = est.address.coordinates;
	const filteredCoordinates: string = coordinates.replace(/ /g,'');

    return (
		<>
			<Head>
				<script src="https://kit.fontawesome.com/0011017bbe.js" crossOrigin="anonymous"></script>
			</Head>
			<Layout page="establishment">

				{/* Gallery: */}
				<section className="establishment-gallery">
					{formattedGallery} 
				</section>

				{/* Header: */}
				<header className="establishment-header">
					<div className="establishment-header__box">
						<h2 className="establishment-header__title">{est.name}</h2>
						<div className="establishment-header__stars">{calculatedStars}</div>
					</div>
					<div className="establishment-header__box">
						<div className="establishment-header__address">
							<Image src="/assets/icons/address-primary.svg" alt="star" layout="intrinsic" width={15} height={15} />
							{est.address.street}
						</div>
						<div className="establishment-header__rating-box">
							<div>
								<div className="establishment-header__rating">{est.rating}</div>
								<div className="establishment-header__reviews">{est.reviews} reviews</div>
							</div>
						</div>
					</div>
				</header>

				{/* Details: */}
				<section className="establishment-details">
					<Details 
						coordinates={filteredCoordinates}
						description={est.description}
						amenities={est.amenities} />
					<Rooms />
					<EstablishmentReviews />
				</section>

				{/* Booking */}
				<section className="establishment-booking booking" id="booking">
					<h3 className="booking__title">Good news we have 3 rooms left!</h3>
					<ModalButton theme="primary" size="cta" type="submit">
						book now
					</ModalButton>
				</section>
				
			</Layout>

			{/* Booking Enquiry Modal: */}
			<BookingEnquiry
				email={est.email}
				phone={est.phone}
				street={est.address.street}
				city={est.address.city}
				zipcode={est.address.zipcode}
				establishment={est.name} />
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
				address {
					coordinates
					street
					zipcode
					city
				}
				gallery {
					id
					alternativeText
					url
					width
					height
				}
                    
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