import Link from "next/link"

interface ButtonProps {
    link: string;
    children: React.ReactNode;
    theme: 'primary' | 'secondary';
    size: string;
}

interface ModalButtonProps {
    children: React.ReactNode;
    theme: 'primary' | 'secondary';
    size: string;
    type?: "button" | "submit" | "reset" | undefined;
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


export const ModalButton: React.FC<ModalButtonProps> = ({children, theme, size, type}) => {
    return (
        <button className={'btn ' + `btn--${theme} ` + `btn--${size}`} type={type}>
            <a href="#modal">
                {children}
            </a>
        </button>
    );
}