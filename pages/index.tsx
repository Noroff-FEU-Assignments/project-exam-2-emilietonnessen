import Category from "../components/Category";
import Featured from "../components/Featured";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ESTABLISHMENTS_URL } from "../constants/api";

interface HomeProps {
    establishments?: any;
    props?: any;
}

const home: React.FC<HomeProps> = ({establishments}) => {
    console.log(establishments);

    return (
        <Layout page="home">
            <Hero />
            
            <Category />
            
            <Review />

            <Featured />

            <section className="gallery">
                Gallery
            </section>
        </Layout>
    );
}

export default home; 




export async function getStaticProps() {
    let establishments: any = [];
    
    const client = new ApolloClient({
        uri: ESTABLISHMENTS_URL,
        cache: new InMemoryCache
    });

    const { data } = await client.query({
        query: gql`
            query  {
                establishments {
                    id
                    name
                }
                
                
            }
        `
    });

    return { 
        props: {
            establishments: data.establishment,
        },
	};
} 
