import Image from "next/image"

interface SearchBarProps {
    theme: 'white' | 'grey';
    search: any;
    value: any;
    clearSearch: any;
    iconType: any;
}

const SearchBar: React.FC<SearchBarProps> = ({theme, search, value, clearSearch, iconType}) => {
    return (
        <div className="search__bar">
            <input 
                type="text" 
                className={theme ?  `search__input search__input--${theme}` : 'search__input'} 
                placeholder="Search.."
                onChange={search}
                value={value}
            />
            <button 
                className="search__button"
                onClick={clearSearch} >
                <Image src="/assets/search.svg" alt="button" width="16" height="16"  />
                
            </button>
        </div>
    );
}

export default SearchBar;