import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

interface SearchProps {
    theme: 'white' | 'grey';
}

const Search: React.FC<SearchProps> = ({theme}) => {
    return (
        <div className="search">
            <SearchBar theme={theme} />
            
            <div className="search-results">
                <SearchResult />
            </div>
        </div>
    );
}

export default Search;