import { Provider } from "react-redux";
import { AuthProvider } from "../../context/AuthContext";

import { store } from '../../store/redux';
import Footer from "./Footer"
import Main from "./Main"
import Navigation from "./Navigation"
import NextHead from "./NextHead";

interface LayoutProps {
    children: React.ReactNode;
    page: string;
    title: string;
    description: string;
}

const Layout: React.FC<LayoutProps> = ({children, page, title, description }) =>  (
    <AuthProvider>
        <Provider store={store}>

            <NextHead title={title} description={description} />

            <div className="layout">
                <div className="wrapper">
                    <Navigation active={page}/>
                        
                    <Main page={page}>{children}</Main>
                </div>
                    
                <Footer />
            </div>
            
        </Provider>
    </AuthProvider>
);

export default Layout;