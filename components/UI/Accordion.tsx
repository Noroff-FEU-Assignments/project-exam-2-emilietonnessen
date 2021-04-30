import { useState } from "react";
import { Chevron } from "../UI/Icons";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {

    const [isActive, setActive] = useState(false);

    const toggleOpenCloseHandler = () => {
        setActive(!isActive);
    }

    return (
        <div className="accordion">
            <div className="accordion__header" onClick={toggleOpenCloseHandler}>
                <h2 className="accordion__title">
                    {title}
                </h2>
                <button className={!isActive ? "accordion__button accordion__button--open" : "accordion__button"}>
                    <Chevron color="#141414" />
                </button>
            </div>
            <div className={!isActive ? "accordion__body accordion__open" : "accordion__body accordion__close"}>
                {children}
            </div>
        </div>
    )
}

export default Accordion
