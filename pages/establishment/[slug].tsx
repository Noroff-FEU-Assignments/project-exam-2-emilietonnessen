import { GetStaticProps, GetStaticPaths } from 'next';
import { GRAPHQL_URL, ESTABLISHMENTS_URL } from "../../constants/api";
import Layout from '../../components/Layout';
import axios from 'axios';

const establishmentDetails = () => {
    return (
        <Layout page="establishment">
            
        </Layout>
    );
}

export default establishmentDetails;


export const getStaticPaths = async () => {
	try {
		const response = await axios.get(ESTABLISHMENTS_URL);
        console.log(response);

        const establishments = response.data;

		const paths = establishments.map(est => ({
			params: { 
                id: est.slug.toString() 
            }
		})); 

		return { 
            paths: paths, 
            fallback: false 
        };

	} catch (error) {
		console.log(error);
	}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    console.log(params);
    /* const slug = params.slug;
	const url = `${ESTABLISHMENTS_URL}/${slug}`;
    console.log(url); */
    //console.log(id);

	/* let characters = null;

	try {
		const response = await axios.get(url);
		characters = response.data;
	} catch (error) {
		console.log(error);
	}  */

	return {
		props: { 
            char: 'test' 
        },
	};
}