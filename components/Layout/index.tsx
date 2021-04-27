import Head from "next/head";
import { Provider } from "react-redux";

import { store } from '../../store/redux';
import Footer from "./Footer"
import Main from "./Main"
import Navigation from "./Navigation"

interface LayoutProps {
    children: React.ReactNode;
    page: string;
    title: string;
    description: string;
}

const Layout: React.FC<LayoutProps> = ({children, page, title, description }) =>  (
    <Provider store={store}>

        <Head>
            <script src="https://kit.fontawesome.com/0011017bbe.js" crossOrigin="anonymous"></script>
            <link rel="icon" href="/favicon.ico"  type="image/gif" sizes="16x16"></link>
				<meta name="description" content={description} />
				<title>{title}</title>
        </Head>

        <div className="layout">
            <div className="wrapper">
                <Navigation active={page}/>
                    
                <Main page={page}>{children}</Main>
            </div>
                
            <Footer />
        </div>
    </Provider>
);

export default Layout;