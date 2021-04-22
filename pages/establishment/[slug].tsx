import { GetStaticProps, GetStaticPaths } from 'next';
import { ESTABLISHMENTS_URL } from "../../constants/api";
import Layout from '../../components/Layout';
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';
import Details from '../../components/Details';
import Rooms from '../../components/Rooms';
import EstablishmentReviews from '../../components/EstablishmentReviews';

interface Address {
	coordinates: string;
	street: string;
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
	
	//console.log(typeof(est));
	console.log('[EST]', est);

	const gallery = est.gallery;

	const formattedGallery: JSX.Element[] = gallery.map(img => {
		return (
			<div className="establishment-gallery__box" key={img.id}>
				<Image 
					className="establishment-gallery__img"
					src={img.url} 
					alt={img.alternativeText} 
					layout="responsive" 
					width={img.width} 
					height={img.height}
				/>
			</div>
		)
	}); 

	const n: number = est.stars;
    const calculatedStars: JSX.Element[] = [...Array(n)].map((e, i) => (
        <Image key={i} src="/assets/icons/star-solid-primary.svg" alt="star" layout="intrinsic" width={22} height={22} />
    ));

	// Coordinates
	const coordinates: string = est.address.coordinates;
	const filteredCoordinates: string = coordinates.replace(/ /g,'');

    return (
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
			<section className="establishment-booking">
				Booking
			</section>

			{/* Booking Modal: */}
			<div className="modal">
				Modal
			</div>
        </Layout>
    );
}

export default establishmentDetails;





export const getStaticPaths = async () => {
	try {
		const response = await axios.get(ESTABLISHMENTS_URL);
        const establishments = response.data;
		const paths = establishments.map((est) => ({
			params: { 
				slug: est.slug,
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

export const getStaticProps: GetStaticProps = async ({params}) => {
	let slug: string | string[] | undefined;
    
	if (params) {
		slug = params.slug;
	}

	let estGraphQL: Establishment[] = [];

	const client = new ApolloClient({
        uri: GRAPHQL_URL,
        cache: new InMemoryCache
    });

	const { data } = await client.query({
        query: gql`
            query  {
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
            }
        `
    });

	estGraphQL = data.establishments;

	

	// GraphLQ Testing

	return {
		props: { 
            est: estGraphQL[0]
        },
	};
} 