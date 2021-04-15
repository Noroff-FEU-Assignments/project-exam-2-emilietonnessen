interface MainProps {
    children: React.ReactNode;
    page: string;
}

const Main: React.FC<MainProps> = ({children, page}) => {
    return (
        <div className={'main ' + page}>
            {children}
        </div>
    );
}

export default Main;