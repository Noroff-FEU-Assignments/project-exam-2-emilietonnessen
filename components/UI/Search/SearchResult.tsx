import Image from "next/image";
import { Star } from '../Icons';

interface SearchResultProps {
    name: string;
    thumbnail: string;
    stars: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ name, thumbnail, stars }) => {

    // Calculate the amount of stars that shall be displayed
	const n: number = stars;
    const calculatedStars: JSX.Element[] = [...Array(n)].map((e, i) => <Star key={i} />);

    return (
        <div className="search-result">
            <Image src={thumbnail} alt="button" width="150" height="100"  />
                <div className="search-result__box">
                <h6 className="search-result__hotel-name">{name}</h6>
                <div className="search-result__stars">
                    {calculatedStars}
                </div>
            </div>
        </div>
    );
}
 
export default SearchResult;