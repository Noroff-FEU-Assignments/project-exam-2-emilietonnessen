import Image from "next/image"
import Link from "next/link";

interface EstablishmentCardProps {
    link: any;
    name: string;
    reviews: number;
    stars: number;
    price: number;
    slug: string;
}

const EstablishmentCard: React.FC<EstablishmentCardProps> = ({link, name, reviews, stars, price, slug }) => {
    //console.log(link);

    //const test = link[0];

    //console.log(test);
    
    return (
        <Link href="/">
            <a >
                <div className="establishment-card">
                    <div className="establishment-card__img">
                        {/* <Image src={test} alt={name} layout="responsive" width={600} height={450} /> */}

                    </div>
                    <div className="establishment-card__name">
                        {name}
                    </div>
                    <div className="establishment-card__info">
                        <div className="establishment-card__stars">
                            {stars}
                        </div>
                        <div className="establishment-card__reviews">
                            {reviews} reviews
                        </div>
                        <div className="establishment-card__price">
                            from <span className="establishment-card__price">{price} NOK</span>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
        
    );
}

export default EstablishmentCard;