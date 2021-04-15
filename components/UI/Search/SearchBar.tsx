import Image from "next/image"


const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" className="search__input" placeholder="Search.."/>
            <button className="search__button">
                <Image src="/assets/search.svg" alt="button" width="16" height="16"  />
                
            </button>
        </div>
    );
}

export default SearchBar;