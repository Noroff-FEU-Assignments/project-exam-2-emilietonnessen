import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GRAPHQL_URL } from "../constants/api";
import Layout from '../components/Layout';
import EstablishmentCard from "../components/EstablishmentCard";


interface EstablishmentsProps {
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

const establishments: React.FC<EstablishmentsProps> = ({establishments}) => {

    const EstablishmentCards: JSX.Element[] = establishments.map(est => {
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
        <Layout page="establishments">
            <div className="filter">
                <button className="filter__btn">
                    hotels
                </button>
                <button className="filter__btn">
                    bed & breakfast
                </button>
                <button className="filter__btn">
                    guesthouses
                </button>
                <button className="filter__btn filter__btn--active">
                    explore all &#9747;
                </button>
            </div>
            <div className="establishment-results">
                {EstablishmentCards}
            </div>
        </Layout>
    );
}

export default establishments;


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