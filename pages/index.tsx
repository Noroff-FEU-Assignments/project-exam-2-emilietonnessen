import Layout from "../components/Layout";

const home = () => {
    return (
        <Layout page="home">
            <header className="hero">
                Hero/Banner 
            </header>
            
            <section className="category">
                Categories
            </section>
            
            <section className="review">
                Review
            </section>

            <section className="featured">
                Featured
            </section> 

            <section className="gallery">
                Gallery
            </section>
        </Layout>
    );
}

export default home;