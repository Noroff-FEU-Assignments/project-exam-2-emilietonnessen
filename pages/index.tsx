import Category from "../components/Category";
import Featured from "../components/Featured";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ESTABLISHMENTS_URL } from "../constants/api";
import EstablishmentCard from "../components/EstablishmentCard";

interface HomeProps {
    establishments?: any;
    props?: any;
}

const home: React.FC<HomeProps> = ({establishments}) => {
    console.log(establishments);
    //console.log(establishments[0].gallery[0].url);
    //const testing = establishments[0].gallery[0].url;

    /* const testing = establishments.gallery.map(test => {
        console.log(test);
    }) */

    const imageArray = establishments[i].gallery[0].url;

    //imageArray.splice('1', 0);

    console.log(imageArray);

    const establishmentCards = establishments.map(est => {
        //console.log(est.gallery);
        return (
            <EstablishmentCard 
                key={est.id}
                slug={est.slug}
                name={est.name}
                reviews={est.reviews}
                stars={est.stars}
                price={1234}
                link="test"
                //link={est.gallery.splice(1, 2).map(img => img.url)}
            />
        );
    });


    return (
        <Layout page="home">
            <Hero />
            
            <Category />
            
            <Review />

            <section className="featured">
                {establishmentCards}
            </section>

            <section className="gallery">
                
            </section>
        </Layout>
    );
}

export default home; 




export async function getStaticProps() {
    let establishments: any = [];
    
    // Creating a new Apollo Client
    const client = new ApolloClient({
        uri: ESTABLISHMENTS_URL,
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
                    gallery {
                        id
                        url
                    }
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
