import React from 'react';
import { Link } from 'react-router-dom'
 
const SearchResults = (props) => {

    const renderSearchResults = () => {
        const { model, results } = props
        return results.map(res=>{
            return(
                <div key={res.id} className="search-result">
                    <Link to={`/${model}/` + res.id}><h4>{res.name}</h4></Link>
                </div>
            )
        })
    }

    return (
        <div>
            SearchResults:
            {renderSearchResults()}
        </div>
    );
}
 
export default SearchResults;