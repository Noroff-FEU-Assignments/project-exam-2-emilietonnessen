import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

const Search = () => {
    return (
        <div className="search">
            <SearchBar />
            
            <div className="search-results">
                <SearchResult />
            </div>
        </div>
    );
}

export default Search;