import React from 'react'
import styles from './SearchResults.module.css';
import { TrackList } from '../TrackList/TrackList';

export const SearchResults = () => {
  return (
    <div className="SearchResults">
        {<TrackList />}
    </div>
  );
  
}
