import Accordion from '../../UI/Accordion';
import AddForm from './AddForm';

const AddEstablishments: React.FC = () => {
    return (
        <section className="add-establishments">
            <Accordion title="Add Establishment">
                <AddForm />
            </Accordion>     
        </section>
    );
}

export default AddEstablishments;