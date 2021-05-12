import { useEffect, useState } from "react";
import Accordion from "../../UI/Accordion";
import { AxiosInstance } from "axios";
import useAxios from "../../../hooks/useAxios";
import ContactCard from "./ContactCard";

interface ContactMessages {
    id: number;
    name: string;
    message: string;
    email: string;
    topic: string;
}

const ContactNotifications: React.FC = () => {
    const [enquiries, setEnquiries] = useState<ContactMessages[]>([]);
    const http: AxiosInstance = useAxios();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await http.get("contact-messages");
				setEnquiries(response.data);
            } catch (error) {
                console.log(error)
            }
        }; fetchData(); 
    }, []);

    //console.log("[Contact Messages]", enquiries);

    const contactMessages: JSX.Element[]= enquiries.map(enq => {
        return (
            <ContactCard
                key={enq.id}
                name={enq.name}
                topic={enq.topic}
                email={enq.email}
                message={enq.message} />
        )
    })

    return (
        <section className="contact-notifications">
            <Accordion title="Contact Messages">
                {contactMessages}
            </Accordion>        
        </section>
    );
}

export default ContactNotifications;