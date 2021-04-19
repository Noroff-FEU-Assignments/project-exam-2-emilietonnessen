import Link from "next/link"

interface ButtonProps {
    link: string;
    children: React.ReactNode;
    theme: 'primary' | 'secondary';
    size: string;
}

const Button: React.FC<ButtonProps> = ({link, children, theme, size}) => {
    return (
        <button className={'btn ' + `btn--${theme} ` + `btn--${size}`}>
            <Link href={link}>
                <a>
                    {children}
                </a>
            </Link>
        </button>
    );
}

export default Button;