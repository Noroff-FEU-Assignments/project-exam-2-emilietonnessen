
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { ESTABLISHMENTS_URL } from '../../../constants/api';
import { useState, useEffect } from 'react';

interface SearchProps {
    theme: 'white' | 'grey';
}
 
const Search: React.FC<SearchProps> = ({theme}) => {
    
    const [establishments, setEstablishments] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchIcon, setSearchIcon] = useState();
    const [searchLength, setSearchLength] = useState();
    //const [searchDisplay, setSearchDisplay] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(ESTABLISHMENTS_URL);
                const json = await response.json();
                //console.log('JSON', json);
                setEstablishments(json);
                
            } catch (error) {
                console.log(error)
            }
        }; fetchData(); 
    }, []);

    const searchHandler = (event: any) => {
        setSearchValue(event.target.value);
    }

    const clearSearchHandler = (event: any) => {
        setSearchValue(event.target.value);
    }

    let est: any[] = establishments;
    let searchDisplay = false;
    let search: string = searchValue.trim().toLowerCase();

    if (search.length > 0 ) {
        est = est.filter(est => {
            return est.name.toLowerCase().match(search);
        });
        searchDisplay = true;
    }

    if(search.length === 0) {
        est = [];
        searchDisplay = false;
    }


    // Map through search Results
    const filteredSearchResults = est.map(est => (
        <SearchResult key={est.id} name={est.name} thumbnail={est.thumbnail.url} stars={est.stars} />
    ));
    

    console.log(filteredSearchResults);
    return (
        <>
            
            <div className="search" >

                <SearchBar 
                    theme={theme}
                    search={searchHandler}
                    value={searchValue}
                    clearSearch={clearSearchHandler}
                    iconType={searchIcon}
                />
                
                <div className={!searchDisplay ? 'search-results u-display-none' : 'search-results u-display-block'} >
                    {filteredSearchResults}
                </div>
            </div>
        </>
    );
}

export default Search;