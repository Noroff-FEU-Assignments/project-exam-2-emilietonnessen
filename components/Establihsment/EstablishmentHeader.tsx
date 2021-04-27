import Image from "next/image"

interface EstablishmentHeaderProps {
    name: string;
    stars: number;
    street: string;
    rating: number;
    reviews: number;
}

const EstablishmentHeader: React.FC<EstablishmentHeaderProps> = ({name, stars, street, rating, reviews}) => {

    // Calculate the amount of stars that shall be displayed
	const n: number = stars;
    const calculatedStars: JSX.Element[] = [...Array(n)].map((e, i) => (
        <Image 
			key={i} 
			src="/assets/icons/star-solid-primary.svg" 
			alt="star" 
			layout="intrinsic" 
			width={22} 
			height={22} />
    ));

    return (
        <header className="establishment-header">
					<div className="establishment-header__box">
						<h2 className="establishment-header__title">{name}</h2>
						<div className="establishment-header__stars">{calculatedStars}</div>
					</div>
					<div className="establishment-header__box">
						<div className="establishment-header__address">
							<Image src="/assets/icons/address-primary.svg" alt="star" layout="intrinsic" width={15} height={15} />
							{street}
						</div>
						<div className="establishment-header__rating-box">
							<div>
								<div className="establishment-header__rating">{rating}</div>
								<div className="establishment-header__reviews">{reviews} reviews</div>
							</div>
						</div>
					</div>
		</header>
    );
}

export default EstablishmentHeader;