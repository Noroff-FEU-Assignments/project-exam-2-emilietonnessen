import { Provider } from "react-redux";
import { store } from '../../store/redux';
import Footer from "./Footer"
import Main from "./Main"
import Navigation from "./Navigation"

interface LayoutProps {
    children: React.ReactNode;
    page: string;
}

const Layout: React.FC<LayoutProps> = ({children, page}) => {
    return (
        <Provider store={store}>
            <div className="layout">
                <div className="wrapper">
                    <Navigation active={page}/>
                    
                    <Main page={page}>
                        {children}
                    </Main>
                </div>
                
                <Footer />
            </div>
        </Provider>
        
    );
}

export default Layout;