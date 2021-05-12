interface ErrorProps {
    children: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ children }) => (
    <div className="form__error">
        <i className="fas fa-exclamation-circle"></i> {children}
    </div>
);

export default Error;