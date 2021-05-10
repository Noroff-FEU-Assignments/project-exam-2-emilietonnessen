import { useState } from "react";

interface BookingCardProps {
    establishment: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    startDate: string;
    endDate: string;
    room: string;
    message: string;
}

const BookingCard: React.FC<BookingCardProps> = ({establishment, firstName, lastName, email, phone, startDate, endDate, room, message}) => {
    const [newMessage, setNewMessage] = useState(true);

    const newMessageHandler = () => {
        // Not good method - needs to change 
        setNewMessage(false)
    }

    return (
        <div className="booking-card" onClick={newMessageHandler}>
            
            <div className="booking-card__header">
                <h3 className="booking-card__title">{establishment}</h3>
                {newMessage ? <span className="booking-card__new">New!</span> : null}
            </div>

            <div className="booking-card__details">
                <p className="booking-card__constants">From:</p>
                <p className="booking-card__values">{firstName} {lastName}</p>

                <p className="booking-card__constants">Email:</p>
                <p className="booking-card__values">{email}</p>

                <p className="booking-card__constants">Phone:</p>
                <p className="booking-card__values">{phone}</p>

                <p className="booking-card__constants">Date:</p>
                <p className="booking-card__values">{startDate} - {endDate}</p>

                <p className="booking-card__constants">Room:</p>
                <p className="booking-card__values">{room}</p>
            </div>

            <p className="booking-card__message">
                {message}
            </p>
        </div>
    )
}

export default BookingCard
