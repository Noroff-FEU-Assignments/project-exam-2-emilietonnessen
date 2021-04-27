import { META_CONTACT, TITLE_CONTACT } from '../constants/meta';
import Layout from '../components/Layout';

const contact: React.FC = () => {
    return (
        <>
            <Layout page="contact" title={TITLE_CONTACT} description={META_CONTACT}>
                <div className="contact-background"></div>
                <div className="contact-info">
                    
                </div>
            </Layout>
        </>
    );
}

export default contact;