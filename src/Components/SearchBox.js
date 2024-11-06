import React from 'react';

const SearchBox = ({ searchChange }) => {

    return (
        <div>
        <input 
        className= 'pa3 ba b--light-blue bg-near-white w-20 br2' 
        type='search' 
        onChange={searchChange}
        placeholder= 'search'
        style= {{textAlign:'center'}}
        />
        </div>
    );
}

export default SearchBox;