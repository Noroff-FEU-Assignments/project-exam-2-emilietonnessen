import Image from "next/image";
import { Star } from '../Icons';

const SearchResult = () => {
    return (
        <>
            <div className="search-result">
                <Image src="/assets/establishments/bayside-1.jpg" alt="button" width="150" height="100"  />
                <div className="search-result__box">
                    <h6 className="search-result__hotel-name">Bayside</h6>
                    <div className="search-result__stars">
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </div>
                </div>
            </div>

            <div className="search-result">
                <Image src="/assets/establishments/bluelanterninn-1.jpg" alt="button" width="150" height="100"  />
                <div className="search-result__box">
                    <h6 className="search-result__hotel-name">Blue Lantern Inn</h6>
                    <div className="search-result__stars">
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default SearchResult;