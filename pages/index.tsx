import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GRAPHQL_URL } from "../constants/api";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Review from "../components/Review";
import EstablishmentCard from "../components/EstablishmentCard";
import Gallery from '../components/Gallery';


interface HomeProps {
    establishments: [{
        id: number;
        slug: string;
        featured: boolean;
        reviews: number;
        name: string;
        lowestPrice: number;
        stars: number;
        thumbnail: {
            url: string;
        }
    }];
}

interface Establishments {
    id: number;
    slug: string;
    featured: boolean;
    reviews: number;
    name: string;
    lowestPrice: number;
    stars: number;
    thumbnail: {
        url: string;
    };
}

const home: React.FC<HomeProps> = ({establishments}) => {
    // Filter out the featured establishments
    const filteredEstablishments: Establishments[] = establishments.filter(est => {
        return JSON.stringify(est.featured).match('true');
    }) 

    // Creating the filtered establishments into cards
    const featuredEstablishments: JSX.Element[] = filteredEstablishments.map(est => {
        console.log(est.slug);
        return (
            <EstablishmentCard 
                key={est.id}
                slug={est.slug}
                name={est.name}
                reviews={est.reviews}
                price={est.lowestPrice}
                stars={est.stars}
                image={est.thumbnail.url}
            />
        );
    });
    
    return (
        <Layout page="home">
            <Hero />
            
            <Category />
            
            <Review />

            <section className="featured">
                {featuredEstablishments}
            </section>

            <Gallery />
        </Layout>
    );
}

export default home; 



// API Call with GraphQL and Apollo Client
export async function getStaticProps() {
    let establishments: Establishments[] = [];
    
    // Creating a new Apollo Client
    const client = new ApolloClient({
        uri: GRAPHQL_URL,
        cache: new InMemoryCache
    });

    // Destructing the data endpoints into "data" variable
    const { data } = await client.query({
        query: gql`
            query  {
                establishments {
                    id
                    slug
                    name
                    stars
                    featured
                    reviews
                    lowestPrice
                    thumbnail {url}
                }                   
            }
        `
    });

    // Assigning the fetched data into "establishments" variable
    establishments = data.establishments;

    return { 
        props: {
            establishments: establishments,
        },
	};
} 