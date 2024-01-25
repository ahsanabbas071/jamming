import React from 'react'
import styles from './TrackList.module.css';
import { Track } from '../Track/Track';

export const TrackList = ({tracks, onAdd, isRemoval, onRemove}) => {
  return (
    <div className={styles.TrackList}>
      {tracks ? tracks.map(song => <Track key={song.id} track={song}  onAdd={onAdd} isRemoval={isRemoval} onRemove={onRemove}/> ) : null}
    </div>
  )
}
