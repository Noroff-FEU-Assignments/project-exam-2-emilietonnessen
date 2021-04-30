import AdminLayout from "../components/Layout/AdminLayout";
import { META_ADMIN, TITLE_ADMIN } from "../constants/meta";


const admin = () => {
    return (
        <AdminLayout title={TITLE_ADMIN} description={META_ADMIN} page="admin">

            <section className="booking-notifications">
                Booking Enquiries 
            </section>
        
            <section className="contact-notifications">
                Contact Messages
            </section>
            
            <section className="edit-establishments">
                Edit Establishments 
            </section>
            
            <section className="add-establishments">
                Add Establishments
            </section>
            
        </AdminLayout>
    );
}

export default admin;