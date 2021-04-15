import Footer from "./Footer"
import Main from "./Main"
import Navigation from "./Navigation"

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="layout">
            <div className="wrapper">
                <Navigation />
                
                <Main>
                    {children}
                </Main>
            </div>
            
            <Footer />
        </div>
    );
}

export default Layout;