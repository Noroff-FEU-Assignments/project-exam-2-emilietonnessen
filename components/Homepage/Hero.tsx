import Button from "../UI/Button";
import Search from "../UI/Search";

const Hero: React.FC = () => {
    return (
        <header className="hero">
            <div className="hero__banner">
                <div className="hero__search">
                    <Search theme="white" />
                </div>
            </div>
            <div className="hero__cta">
                <Button link="/establishments" theme="primary" size="cta">
                    explore
                </Button>
            </div>
        </header>
    );
}

export default Hero;