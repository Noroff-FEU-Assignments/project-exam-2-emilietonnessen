import Modal from '../UI/Modal';

export const BookingFeedbackSuccess = () => (
    <Modal link="#main" id="feedback-success" name="modal-feedback">
        <div className="feedback">
            <h3 className="feedback__title">
                Thank you!
            </h3>
            <p className="feedback__text">
                Your message has been successfully sent. We will contact you very soon!
            </p>
        </div>
    </Modal>
);

export const BookingFeedbackError = () => (
    <Modal link="#main" id="feedback-error" name="modal-feedback">
        <div className="feedback feedback--error">
            <h3 className="feedback__title feedback__title--error">
                An error occurred!
            </h3>
            <a href="#modal-booking" className="feedback__text feedback__text--error">
                Please try again
            </a>
        </div>
    </Modal>
);