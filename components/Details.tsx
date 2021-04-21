import Image from "next/image"

interface DetailsProps {
    description: string;
    coordinates: string;
    amenities: any;
}

const Details: React.FC<DetailsProps> = ({description, coordinates, amenities}) => {
    console.log(amenities);
    return (
        <div className="establishment-details__info details">

			<p className="details__description">{description}</p>

            <iframe
                className="details__map"
                width="100%"
                height="400"
                frameBorder="0"
                scrolling="no"
                src={`https://maps.google.com/maps?q=${coordinates}&hl=en-US&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;&output=embed`}>
            </iframe>

			<ul className="details__amenities">
                {amenities}
            </ul>
                
			<div className="details__recommendation">
                <p className="details__recommendation-text">
                    Lucy and other 3 friends recommend this hotel
                </p>
                <div className="details__recommendation-images">
                    <Image src="/assets/users/female-1.jpg" alt="User 1" width={40} height={40} />
                    <Image src="/assets/users/female-2.jpg" alt="User 2" width={40} height={40} />
                    <Image src="/assets/users/male-1.jpg" alt="User 3" width={40} height={40} />
                    <Image src="/assets/users/male-2.jpg" alt="User 4" width={40} height={40} />
                </div>
            </div>
		</div>
    );
}

export default Details;