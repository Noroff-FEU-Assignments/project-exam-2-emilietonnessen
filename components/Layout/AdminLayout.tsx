import AdminNavigation from './AdminNavigation';
import Main from './Main';
import OuterLayout from './OuterLayout';

interface AdminLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    page: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, description, children, page }) => (
    <OuterLayout title={title} description={description}>
        <AdminNavigation />
        <Main page={page}>
            {children}
        </Main>
    </OuterLayout>
)

export default AdminLayout;