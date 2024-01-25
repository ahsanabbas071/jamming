import React from 'react';
import styles from './Track.module.css';

export const Track = ({track, isRemoval, onAdd, onRemove}) => {
  function renderAction() {
    if (isRemoval) {
        return <button className={styles.TrackAction} onClick={removeTrack}>-</button>;
    } else {
        return <button className={styles.TrackAction} onClick={addTrack}>+</button>;
      }
  }

  function addTrack (){
    onAdd(track);
  };

  function removeTrack(){
    onRemove(track);
  }
  return (
    <div className={styles.Track}>
        <div className={styles.TrackInformation}>
          <h3>{track.name}</h3>
          
          <p>{track.artist} | {track.album}</p>
        </div>
        {renderAction()}
    </div>
  )
}
