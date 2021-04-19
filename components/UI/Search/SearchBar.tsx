import Image from "next/image"

interface SearchBarProps {
    theme: 'white' | 'grey';
}

const SearchBar: React.FC<SearchBarProps> = ({theme}) => {
    return (
        <div className="search__bar">
            <input type="text" className={theme ?  `search__input search__input--${theme}` : 'search__input'} placeholder="Search.."/>
            <button className="search__button">
                <Image src="/assets/search.svg" alt="button" width="16" height="16"  />
                
            </button>
        </div>
    );
}

export default SearchBar;