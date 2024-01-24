import React from 'react'
import styles from './Playlist.module.css';
import { TrackList } from '../TrackList/TrackList';

export const Playlist = () => {
  return (
    <div className="Playlist">
      <input defaultValue={"New Playlist"} />
      {<TrackList />}
      <button className="Playlist-save">
        SAVE TO SPOTIFY
      </button>
    </div>
  )
}
