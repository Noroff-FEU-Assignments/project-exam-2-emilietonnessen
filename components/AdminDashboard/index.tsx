import AddEstablishments from "./AddEstablishments";
import BookingNotifications from "./BookingNotifications";
import ContactNotifications from "./ContactNotifications";
import EditEstablishments from "./EditEstablishments";

const index: React.FC = () => (
    <div className="admin-dashboard">
        <div className="admin-dashboard__group">
            <BookingNotifications />
            <ContactNotifications />
        </div>
        <div className="admin-dashboard__group">
            <EditEstablishments />
            <AddEstablishments />
        </div>
    </div>
);

export default index;