import Image from "next/image"
import Link from "next/link";

interface EstablishmentCardProps {
    image: string;
    name: string;
    reviews: number;
    stars: number;
    price: number;
    slug: string;
}

const EstablishmentCard: React.FC<EstablishmentCardProps> = ({image, name, reviews, stars, price, slug }) => {

    // Loop through the correct amount of stars
    const n: number = stars;
    const calculatedStars: JSX.Element[] = [...Array(n)].map((e, i) => (
        <Image key={i} src="/assets/icons/star-solid-grey.svg" alt={name} layout="intrinsic" width={22} height={22} />
    ));


    return (
        <Link href={`/establishment/${slug}`}>
            <a>
                <div className="establishment-card">
                    <div className="establishment-card__img">
                        <Image src={image} alt={name} layout="responsive" width={600} height={450} /> 
                    </div>
                    <div className="establishment-card__name">
                        {name}
                    </div>
                    <div className="establishment-card__info">
                        <div className="establishment-card__stars">
                            {calculatedStars}
                            <span className="establishment-card__reviews">{reviews} Reviews</span>
                        </div>
                        <div className="establishment-card__price-box">
                            from <span className="establishment-card__price">{price} NOK</span>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
}

export default EstablishmentCard;