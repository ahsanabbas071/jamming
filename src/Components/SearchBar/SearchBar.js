import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({onSearch}){
  const [term, setTerm] = useState("");
  function search(){
    onSearch(term);
  }

  function handleTermChange(e){
    setTerm(e.target.value);
  }

  return (
    <div className={styles.SearchBar}>
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
      />
      <button className={styles.SearchButton} onClick={search}>
        SEARCH
      </button>
    </div>
    )
}
export default SearchBar;