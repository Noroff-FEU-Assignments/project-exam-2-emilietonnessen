import Modal from './UI/Modal';
import BookingInfo from "./BookingInfo";
import BookingForm from "./BookingForm";

interface BookingEnquiryProps {
    email: string;
    phone: number;
    street: string;
    zipcode: number;
    city: string;
    establishment: string;
}

const BookingEnquiry: React.FC<BookingEnquiryProps> = ({email, phone, street, zipcode, city, establishment }) => (
    <Modal link="#main">
        <div className="booking-enquiry">

            {/* Left Side: Booking Information */}
            <BookingInfo street={street} email={email} phone={phone} zipcode={zipcode} city={city} />
                
            {/* Right Side: Booking Form */}
            <BookingForm establishment={establishment} />
            
        </div>
    </Modal>
);


export default BookingEnquiry;