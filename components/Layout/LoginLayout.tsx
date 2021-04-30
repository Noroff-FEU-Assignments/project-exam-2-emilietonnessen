import { AuthProvider } from '../../context/AuthContext';
import NextHead from './NextHead';

interface LoginLayout {
    title: string;
    description: string;
    children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayout> = ({ title, description, children }) =>  (
    <AuthProvider>
        <NextHead title={title} description={description} />
        {children}
    </AuthProvider>
);

export default LoginLayout;