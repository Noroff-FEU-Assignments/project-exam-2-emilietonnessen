import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GRAPHQL_URL } from "../constants/api";
import Layout from '../components/Layout';
import EstablishmentCard from "../components/Establihsment/EstablishmentCard";
import { META_ESTABLISHMENTS, TITLE_ESTABLISHMENTS } from '../constants/meta';
import { useEffect, useState } from 'react';


interface EstablishmentsProps {
    est: Establishments[];
}

interface Establishments {
    id: number;
    slug: string;
    category: string;
    featured: boolean;
    reviews: number;
    name: string;
    lowestPrice: number;
    stars: number;
    thumbnail: {
        url: string;
    };
}

const establishments: React.FC<EstablishmentsProps> = ({est}) => {
    
    const hotel = 'hotel';
    const bnb = 'bedandbreakfast';
    const guesthouse = "guesthouse";
    const explore = "explore";

    const [establishments, setEstablishments] = useState<Establishments[]>([]);
    const [active, setActive] = useState(explore);

    // Set the Establishment to show all as default:   
    useEffect(() => {
        setEstablishments(est);
    }, []);

    
    let filterEstablishments: Establishments[] = establishments;
    
    const hotelFilterHandler = () => {
        filterEstablishments = est.filter(est => {
            return est.category.toLowerCase().match(hotel);
        });

        //console.log('[Hotels]', filterEstablishments);
        setEstablishments(filterEstablishments);
        setActive(hotel);
    }

    const guesthouseFilterHandler = () => {
        filterEstablishments = est.filter(est => {
            return est.category.toLowerCase().match(guesthouse);
        });

        //console.log('[Guesthouses]', filterEstablishments);
        setEstablishments(filterEstablishments);
        setActive(guesthouse);
    }

    const bnbFilterHandler = () => {
        filterEstablishments = est.filter(est => {
            return est.category.toLowerCase().match(bnb);
        });

        //console.log('[B&B]', filterEstablishments);
        setEstablishments(filterEstablishments);
        setActive(bnb);
    }

    const exploreAllFilterHandler = () => {
        filterEstablishments = est;

        //console.log('[Explore All]', filterEstablishments);
        setEstablishments(filterEstablishments);
        setActive(explore);
    }
    
    const filteredResult: JSX.Element[] = establishments.map(est => {
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

    let activeHotels = false;
    let activeBnBs = false;
    let activeGuesthouses = false;
    let activeExplore = false;

    if (active === hotel) {
        activeHotels = true;
    } else {
        activeHotels = false;
    }
    
    if (active === bnb) {
        activeBnBs = true;
    } else {
        activeBnBs = false;
    }
    
    if (active === guesthouse) {
        activeGuesthouses = true;
    } else {
        activeGuesthouses = false;
    }

    if (active === explore) {
        activeExplore = true;
    } else {
        activeExplore = false;
    }


    return (
        <Layout page="establishments" title={TITLE_ESTABLISHMENTS} description={META_ESTABLISHMENTS}>



            {/* Filter */}
            <div className="filter">
                <button className={activeHotels ? "filter__btn filter__btn--active" : "filter__btn" } onClick={hotelFilterHandler}>
                    hotels
                </button>
                <button className={activeBnBs ? "filter__btn filter__btn--active" : "filter__btn" } onClick={bnbFilterHandler}>
                    bed & breakfast
                </button>
                <button className={activeGuesthouses ? "filter__btn filter__btn--active" : "filter__btn" } onClick={guesthouseFilterHandler}>
                    guesthouses
                </button>
                <button className={activeExplore ? "filter__btn filter__btn--active" : "filter__btn" } onClick={exploreAllFilterHandler}>
                    explore all
                </button>
            </div>

            {/* Establishments */}
            <div className="establishment-results">
                {filteredResult}
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
                    category
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
            est: establishments,
        },
	};
} 