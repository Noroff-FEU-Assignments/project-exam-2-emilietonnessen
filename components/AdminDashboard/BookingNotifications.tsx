import { useEffect, useState } from "react";
import Accordion from "../UI/Accordion";
import { AxiosInstance } from "axios";
import useAxios from "../../hooks/useAxios";
import BookingCard from "./BookingCard";

interface Booking {
    id: number;
    firstName: string;
    lastName: string;
    room: string;
    message: string;
    startDate: string;
    endDate: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
    published_at: string;
    establishment: string;
}

const BookingNotifications: React.FC = () => {
    const [enquiries, setEnquiries] = useState<Booking[]>([]);
    const http: AxiosInstance = useAxios();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await http.get("enquiries");
				setEnquiries(response.data);
            } catch (error) {
                console.log(error)
            }
        }; fetchData(); 
    }, []);

    console.log("[Enquiries]", enquiries);

    const bookingEnquiries: JSX.Element[]= enquiries.map(enq => {
        return (
            <BookingCard
                key={enq.id}
                establishment={enq.establishment}
                firstName={enq.firstName}
                lastName={enq.lastName}
                email={enq.email}
                phone={enq.phone}
                startDate={enq.startDate}
                endDate={enq.endDate}
                room={enq.room}
                message={enq.message} />
        )
    })

    return (
        <section className="booking-notifications">
            <Accordion title="Booking Enquiries ">
                {bookingEnquiries}
            </Accordion>        
        </section>
    );
}

export default BookingNotifications;