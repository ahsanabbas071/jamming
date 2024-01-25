import React from 'react'
import styles from './SearchResults.module.css';
import { TrackList } from '../TrackList/TrackList';

export const SearchResults = ({searchResults, onAdd}) => {
  return (
    <div className={styles.SearchResults}>
        {<TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false}/>}
    </div>
  );
  
}
