import React, { useState }from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';



function App() {
  const [searchResults, setSearchResults] = useState([]);

  const [playlistName, setPlaylistName] = useState('Playlist Name');

  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addTrack(track){
    const foundTrack = playlistTracks.find((playlistTrack) => playlistTrack.id === track.id);
    const newTrack = playlistTracks.concat(track);

    if(foundTrack) {
      return new Error('Track Already exusts');
    } else {
      setPlaylistTracks(newTrack);
    }
  };

  function removeTrack(track){
    const isPresent = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    setPlaylistTracks(isPresent);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist(){
    const tracksURIs = playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(playlistName, tracksURIs).then(() => {
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);

    });
  }

  const search = (term) => {
    Spotify.search(term).then(result => setSearchResults(result));
  }

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        <SearchBar onSearch={search}/>
        <div className={styles.AppPlaylist}>
          <SearchResults searchResults={searchResults} onAdd={addTrack}/>
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist}/>
        </div>
      </div>
    </div>
  );
}

export default App;
