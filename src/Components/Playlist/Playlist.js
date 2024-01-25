import React from 'react'
import styles from './Playlist.module.css';
import { TrackList } from '../TrackList/TrackList';

export const Playlist = ({playlistName, playlistTracks, onRemove, onNameChange, onSave}) => {

  function handleNameChange(e){
    onNameChange(e.target.value);
  }

  return (
    <div className={styles.Playlist}>
      <input defaultValue={"New Playlist"} onChange={handleNameChange}/>
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>
      <button className={styles.PlaylistSave} onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  )
}
