interface ModalProps {
    children: React.ReactNode;
    link: string;
}

const Modal: React.FC<ModalProps> = ({children, link}) => {
    return (
        <div className="modal" id="modal">
            <div className="modal__content">
                <a href={link} className="modal__close">&times;</a>
                {children}
            </div>
        </div>
    );
}

export default Modal;