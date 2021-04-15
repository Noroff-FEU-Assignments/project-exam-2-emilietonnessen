import Image from 'next/image';
import Link from 'next/link';
import Search from '../UI/Search';

interface NavigationProps {
    active: string;
}

const Navigation: React.FC<NavigationProps> = ({active}) => {
    return (
        <nav className="navigation">
            <div className="logo">
                <Link href="/">
                    <a>
                        <Image src="/assets/logo.svg" alt="logo" width="54.18" height="50" />
                        <h1>Holidaze</h1>
                    </a>
                </Link>
            </div>

            <Search />

            <ul className="menu">

                <li className="menu__item">
                    <Link href="/establishments">
                        <a className={active.toLowerCase() == 'establishments' ? "menu__link active" : "menu__link"}>
                            Establishments
                        </a>
                    </Link>
                </li>


                <li className={active.toLowerCase() == 'contact' ? "menu__item active" : "menu__item"}>
                    <Link href="/contact">
                        <a className="menu__link">
                            Contact
                        </a>
                    </Link>
                </li>

            </ul> 
             
        </nav>
    );
}

export default Navigation;