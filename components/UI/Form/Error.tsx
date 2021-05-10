interface ErrorProps {
    children: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ children }) => (
    <span className="form__error">
        <i className="fas fa-exclamation-circle"></i> 
        {children}
    </span>
);

export default Error;