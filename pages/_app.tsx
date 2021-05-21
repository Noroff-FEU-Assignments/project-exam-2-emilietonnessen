import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import '../sass/style.scss';
import { CategoryProvider } from '../context/state';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <CategoryProvider>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </CategoryProvider>
        
    );
}

export default MyApp;