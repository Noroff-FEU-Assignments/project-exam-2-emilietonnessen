import EstablishmentDetails from './EstablishmentDetails';
import EstablishmentReview from './EstablishmentReview';
import EstablishmentRoom from './EstablishmentRoom';

interface EstablishmentInfoProps {
    coordinates: string;
    description: string;
    amenities: string;
}

const EstablishmentInfo: React.FC<EstablishmentInfoProps> = ({ coordinates, description, amenities }) => {

    // Removing any spaces in the coordinates
	//const coordinates: string = est.address.coordinates;
	const filteredCoordinates: string = coordinates.replace(/ /g,'');

    return (
        <section className="establishment-details">
			<EstablishmentDetails 
				coordinates={filteredCoordinates}
				description={description}
				amenities={amenities} />
			
            <EstablishmentRoom />
			
            <EstablishmentReview />
		</section>
    );
}

export default EstablishmentInfo;