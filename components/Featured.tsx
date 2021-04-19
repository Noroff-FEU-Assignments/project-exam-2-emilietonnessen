import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ESTABLISHMENTS_URL } from '../constants/api';
import { GetStaticProps } from 'next';

interface FeaturedProps {
    establishments?: any;
    props?: any;
}

const Featured: React.FC<FeaturedProps> = (establishments, props) => {
    //console.log('establishments', establishments);
    //console.log('props', props);

    return (
        <section className="featured">
            test
        </section> 
    );
}

export default Featured;


export async function getStaticProps() {
    let establishments: any = [];
    
    const client = new ApolloClient({
        uri: 'https://api.spacex.land/graphql/',
        cache: new InMemoryCache
    });

    const { data } = await client.query({
        query: gql`
            query GetLaunches {
                launchesPast(limit: 10) {
                    id
                    mission_name
                    launch_date_local
                    launch_site {
                    site_name_long
                }
                links {
                    article_link
                    video_link
                    mission_patch
                }
                rocket {
                    rocket_name
                }
                }
            }
        `
    });

    return { 
        props: {
            establishments: 'test',
        },
	};
} 
