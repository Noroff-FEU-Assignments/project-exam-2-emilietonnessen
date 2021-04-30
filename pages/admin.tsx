import { NextRouter, useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { META_ADMIN, TITLE_ADMIN } from "../constants/meta";
import AdminDashboard from "../components/AdminDashboard";
import AdminLayout from "../components/Layout/AdminLayout";
import AuthContext from "../context/AuthContext";

const admin: React.FC = () => {
    const [auth]: any = useContext(AuthContext);
    const router: NextRouter = useRouter();

    // Redirect the user if the user is not authenticated or if there is no auth in the local storage
    useEffect(() => {
        if(!auth) {
            router.push("/login");
            localStorage.clear();
        } 

        try {
            if (auth.user.role.type !== "authenticated") {
                router.push("/login");
                localStorage.clear();
            }
        } catch (error) {
            router.push("/login");
            localStorage.clear();
        }
    }, []);

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