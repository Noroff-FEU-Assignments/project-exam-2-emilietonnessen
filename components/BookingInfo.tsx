interface BookingInfoProps {
    street: string;
    zipcode: number;
    city: string;
    phone: number;
    email: string;
}

const BookingInfo: React.FC<BookingInfoProps> = ({street, zipcode, city, phone, email}) => (
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
);

export default BookingInfo;