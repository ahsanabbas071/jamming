let accessToken = "";
const clientID = "dcab11367358486d9697f2adc26bb34d";
const redirectURL = "http://localhost:3000/";
const Spotify = {
    getAccessToken(){

        if (accessToken){
            return accessToken;
        }

        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if(urlAccessToken && urlExpiresIn){
            accessToken = urlAccessToken[1];
            const expiresIn = Number(urlExpiresIn[1]);
            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        }

        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        window.location = redirect;
        
    },
    search(term){
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
         }
        )
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Request failed');
        })
            
        .then(jsonResponse => {
            if(!jsonResponse){
                return [];
            }
            return jsonResponse.tracks.items?.map((t) => {
                return {
                    name: t.name,
                    artist: t.artists?.[0].name,
                    album: t.album.name,
                    id: t.id,
                    uri: t.uri,
                }
            });

        })
    },
    savePlaylist(name, tracksURIs){
        if (!name || !tracksURIs) {
            return;
        } 
        accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID = "";

        return fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: headers,
        })
        .then(response => response.json())
        .then(jsonResponse => {
            userID = jsonResponse.id;
            let playlistID = "";
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({name: name})
            })
            .then(response => response.json())
            .then(jsonResponse => {
                playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({uris: tracksURIs}),

                })
            })
            
        })
    }

    }


export {Spotify};