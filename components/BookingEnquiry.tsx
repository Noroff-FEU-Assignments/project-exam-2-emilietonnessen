import Button from './UI/Button';
import Modal from './UI/Modal';

interface BookingEnquiryProps {
    email: string;
    phone: number;
    street: string;
    zipcode: number;
    city: string;
}

const BookingEnquiry: React.FC<BookingEnquiryProps> = ({email, phone, street, zipcode, city }) => {
    return (
        <Modal link="#main">
            <div className="booking-enquiry">

                {/* Left Side: Booking Information */}
                <section className="booking-info">
                    <div className="booking-info__content">
                        <div className="booking-info__box">
                            <img className="booking-info__icon" src="/assets/icons/address-primary.svg" alt="Map Icon"/>
                            <h5 className="booking-info__title">Address</h5>
                            <p className="booking-info__text">{street}</p>
                            <p className="booking-info__text">{zipcode}, {city}</p>
                            <p className="booking-info__text">Norway</p>
                        </div>
                        <div className="booking-info__box">
                            <img className="booking-info__icon" src="/assets/icons/phone-solid.svg" alt="Map Icon"/>
                            <h5 className="booking-info__title">Phone</h5>
                            <p className="booking-info__text">+47 {phone}</p>
                        </div>
                        <div className="booking-info__box">
                            <img className="booking-info__icon" src="/assets/icons/envelope-solid.svg" alt="Map Icon"/>
                            <h5 className="booking-info__title">Email</h5>
                            <p className="booking-info__text">{email}</p>
                        </div>
                    </div>
                </section>
                
                {/* Right Side: Booking Form */}
                <form action="" className="booking-form">
                    <h3 className="booking-form__title">Book now!</h3>

                    {/* Choose a room: */}
                    <div className="form__group booking-form__group--1">
                        <label htmlFor="name" className="form__label">Choose a room</label>
                        <input type="text" className="form__input" placeholder="Choose a room" />
                    </div>

                    {/* First Name */}
                    <div className="form__group booking-form__group--2">
                        <label htmlFor="name" className="form__label">First Name</label>
                        <input type="text" className="form__input" placeholder="Kari" />
                    </div>

                    {/* Last Name */}
                    <div className="form__group booking-form__group--3">
                        <label htmlFor="name" className="form__label">Last Name</label>
                        <input type="text" className="form__input" placeholder="Nordmann" />
                    </div>

                    {/* Email: */}
                    <div className="form__group booking-form__group--4">
                        <label htmlFor="name" className="form__label">Email</label>
                        <input type="text" className="form__input" placeholder="kari@nordmann.no" />
                    </div>

                    {/* Phone Number: */}
                    <div className="form__group booking-form__group--5">
                        <label htmlFor="name" className="form__label">Phone Number</label>
                        <input type="text" className="form__input" placeholder="+47 123 45 678" />
                    </div>

                    {/* Start Date: */}
                    <div className="form__group booking-form__group--6">
                        <label htmlFor="name" className="form__label">Start Date:</label>
                        <input type="date" name="" id="" className="form__input"/>
                    </div>

                    {/* End Date: */}
                    <div className="form__group booking-form__group--7">
                        <label htmlFor="name" className="form__label">End Date:</label>
                        <input type="date" name="" id="" className="form__input"/>
                    </div>

                    {/* Message: */}
                    <div className="form__group booking-form__group--8">
                        <label htmlFor="name" className="form__label">Message</label>
                        <textarea className="form__textarea" placeholder="What can I do for you?"  />
                    </div>

                    <div className="booking-form__submit">
                        <Button link="" theme="primary" size="md">
                            book
                        </Button>
                    </div>
                    
                    
                </form>
            </div>
        </Modal>
    );
}

export default BookingEnquiry;