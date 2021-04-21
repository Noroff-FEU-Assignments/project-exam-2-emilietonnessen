
import React from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { ESTABLISHMENTS_URL } from '../../../constants/api';
import { useState, useEffect } from 'react'

interface SearchProps {
    theme: 'white' | 'grey';
}
 
const Search: React.FC<SearchProps> = ({theme}) => {
    
    const [establishments, setEstablishments] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchIcon, setSearchIcon] = useState();

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

    return (
        <>
            {/* {console.log('Establishments', establishments)} */}
            <div className="search">

                <SearchBar 
                    theme={theme}
                    search={searchHandler}
                    value={searchValue}
                    clearSearch={clearSearchHandler}
                    iconType={searchIcon}
                />
                
                <div className="search-results">
                    
                    <SearchResult />
                </div>
            </div>
        </>
    );
}

export default Search;