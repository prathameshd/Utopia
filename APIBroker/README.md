# API Broker

This repo contains the APIs for interacting with Spotify API for User Authentication, Searching for songs and Enabler for Recommendation Engine.

Following are the Endpoints of this Service:

- /getAuth
Gets Authentication Token From Spotify. This is used to get AccessToken.

- /getAccess
Gets Access Token from Spotify API, by passing Authentication Token.

- /searchSong
Takes query string from user and generates search results from Spotify.

- /getValence
Profile Services calls this endpoint to get valence of a particular song while storing User History.

- /getRecommendedTracks
Takes valence as parameter and returns list of songs from Spotify API.


