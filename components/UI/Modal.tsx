interface ModalProps {
    children: React.ReactNode;
    link: string;
    id: string;
    name: string;
}

const Modal: React.FC<ModalProps> = ( {children, link, id, name} ) => {
    return (
        <div className={`modal ${name}`} id={id}>
            <div className="modal__content">
                <a href={link} className="modal__close">&times;</a>
                {children}
            </div>
        </div>
    );
}

export default Modal;