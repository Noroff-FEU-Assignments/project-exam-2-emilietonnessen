import Link from "next/link"

interface ButtonProps {
    link: string;
    children: React.ReactNode;
    theme: 'primary' | 'secondary';
    size: string;
}

const Button: React.FC<ButtonProps> = ({link, children, theme, size}) => {
    return (
        <button className={'btn ' + `btn--${theme} `}>
            <Link href={link}>
                <a className={`btn--${size}`}>
                    {children}
                </a>
            </Link>
        </button>
    );
}

export default Button;


interface ModalButtonProps {
    children: React.ReactNode;
    theme: 'primary' | 'secondary';
    size: string;
    type?: "button" | "submit" | "reset" | undefined;
}

export const ModalButton: React.FC<ModalButtonProps> = ({children, theme, size, type}) => {
    return (
        <button className={'btn ' + `btn--${theme}`} type={type}>
            <a href="#modal" className={`btn--${size}`}>
                {children}
            </a>
        </button>
    );
}


interface SubmitButtonProps {
    children: React.ReactNode;
    theme: 'primary' | 'secondary';
    size: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({children, theme, size}) => {
    return (
        <button className={'btn ' + `btn--${theme} ` + `btn--${size}`} type="submit">
            {children}
        </button>
    );
}