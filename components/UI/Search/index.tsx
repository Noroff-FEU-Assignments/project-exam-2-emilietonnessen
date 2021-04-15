import SearchBar from './SearchBar';
import SearchResults from './SearchResult';

const Search = () => {
    return (
        <div className="search">
            <SearchBar />
            
            <div className="search-results">
                <SearchResults />
            </div>
        </div>
    );
}

export default Search;