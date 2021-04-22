import Image from "next/image"

interface DetailsProps {
    description: string;
    coordinates: string;
    amenities: string;
}

const Details: React.FC<DetailsProps> = ({description, coordinates, amenities}) => {
    console.log(amenities);

    const arrayAmenities = amenities.split('\n');

    const finalAmenities: JSX.Element[] = arrayAmenities.map(am => {
        return (
            <li  key={am}>
                <Image 
                    src="/assets/icons/list-decoration.svg" 
                    alt="List Decoration" 
                    height={15} 
                    width={15}  
                />
                {am}
            </li>
        );
    });

    return (
        <div className="establishment-details__info details">

			<p className="details__description">{description}</p>

            <div className="details__map">
                <iframe
                    className="details__iframe"
                    width="100%"
                    height="max-content"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://maps.google.com/maps?q=${coordinates}&hl=en-US&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;&output=embed`}>
                </iframe>
            </div>
            

			<ul className="details__amenities">
                {finalAmenities}
            </ul>
                
			<div className="details__recommendation">
                <p className="details__recommendation-text">
                    Lucy and other 3 friends recommend this hotel
                </p>
                <div className="details__recommendation-images">
                    <Image src="/assets/users/female-1.jpg" alt="User 1" width={45} height={45} />
                    <Image src="/assets/users/female-2.jpg" alt="User 2" width={45} height={45} />
                    <Image src="/assets/users/male-1.jpg" alt="User 3" width={45} height={45} />
                    <Image src="/assets/users/male-2.jpg" alt="User 4" width={45} height={45} />
                </div>
            </div>
		</div>
    );
}

export default Details;