import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {ToastContainer, ToastStore} from 'react-toasts'
var config = require('../../config');

class Homepage extends Component
{

	constructor()
	{
		super();
		this.state={accessToken:"",
		currentSong:"https://open.spotify.com/embed/track/4bHsxqR3GMrXTxEPLuK5ue",
		searchResults: [],
		arrayOfRecommended: [],
		isSearchResultsVisible: false,
		isRecommendationsVisible: false,
		songCardStyle: {marginBottom: 18, width: 150, height: 150, marginRight: 18, display: 'inline-block'},
	};
	this.searchSongs=this.searchSongs.bind(this)
	this.playSong=this.playSong.bind(this)
	this.handleEnterKey=this.handleEnterKey.bind(this)
	this.getValenceFromAPIBroker = this.getValenceFromAPIBroker.bind(this)
	this.setHistory = this.setHistory.bind(this)
	this.getRecommendedValence = this.getRecommendedValence.bind(this)

}
componentWillMount(){
	if(!sessionStorage.getItem('jwt') || !sessionStorage.getItem('name')){
		window.location.href = "/login";
	}
}

componentDidMount()
{
	console.log(" ########### INSIDE ComponentDidMount ####################")
	var x=window.location.href;
	var codeCode=x.split('code=')[1];
	if(!codeCode)
	{
		window.location='/';
	}
	this.getRecommendedValence(); // Used for getting recommendations

	return axios
	({
		method:'post',
		url:config.apiBrokerHost+'/getAccess',
		data:{
			codeCode
		},
		headers: {'Access-Control-Allow-Origin': '*',
		'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
	}
	// 'Authorization': 'Bearer '+accesstoken }
	//sessionStorage.getItem('token')}
})
.then((response)=>
{
	if(response.status == 200)
	{
		this.setState({
			accessToken:response.data.data
		});
		sessionStorage.setItem("spotifyToken", response.data.data)

	}
	else{
		return([])
	}
}).catch(err => {
	console.log("No search results ", err)
	if(err.status==401){
		window.location.href = "/login";
	}
	return([])
})
} // ComponentDidMount

///////
// Returns suggested tracks
///////
getRecommendedTrackList(valence){
	console.log("Got avg valence!!! Let's get some tracks now!!")
	return axios
	({
		method:'post',
		url:config.apiBrokerHost+'/getRecommendedTracks',
		data:{
			access_token:sessionStorage.getItem('spotifyToken'),
			valence: valence
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
		}

	})
	.then((response)=>
	{
		console.log("RECOMMENDED TRACKS ARE: ",response.data)
		if(response.status === 200)
		{

			var finalRecommendedTracks = response.data.data;
			this.setState({arrayOfRecommended: finalRecommendedTracks})
			this.setState({isRecommendationsVisible: true})
		}
		else{

			return([])
		}
	}).catch(err => {

		console.log("Couldn't get history for user :( ", err)
		// if(err.response.status==401){
		// 	window.location.href = "/login";
		// }
		console.log(err)
		return([])
	})
}


// -----------
// Fetches valence and then calls next func
// to get suggested tracks
// -----------
getRecommendedValence(){
	console.log("Trying to get an average valence.....")
	return axios
	({
		method:'GET',
		url:config.recommendationEngine+'getRecommendedValence',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
		}

	})
	.then((response)=>
	{

		if(response.status == 200)
		{
			var recommendedValence = response.data.data;
			this.getRecommendedTrackList(recommendedValence)
		}
		else{

			return([])
		}
	}).catch(err => {
		console.log("Couldn't get RECO.VALENCE ", err)
		if(err.status==401){
			window.location.href = "/login";
		}
		return([])
	})
}


// Sets history, if song_id & valence provided
setHistory(song_id, valence){
	axios
	({
		method:'post',
		url:config.profileServices+'/setHistoryAndMood',
		data:{
			songId: song_id,
			valence: valence
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
		}

	})
	.then((response)=>
	{

		if(response.status === 200)
		{
			console.log("Successfully set valence and history")
		}
		else{
			console.log("SET HISTORY MESSED UP!!!",response)

			return([])
		}
	}).catch(err => {
		console.log("SET HISTORY MESSED UP!!!", err)
		if(err.status==401){
			window.location.href = "/login";
		}
		return([])
	})
}


// Hits API Broker with a song ID to get its valence
getValenceFromAPIBroker(song_id){
	console.log("Getting valence for song id: ", song_id);

	axios
	({
		method:'post',
		url:config.apiBrokerHost+'/getValence',
		data:{
			songId:song_id,
			access_token:sessionStorage.getItem('spotifyToken')
		},
		headers: {
			'Access-Control-Allow-Headers': '*',
			'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
		}

	})
	.then((response)=>
	{
		console.log("INSIDE GET VALENCE:: ",response.data.data["valence"])
		if(response.status === 200)
		{
			var valence = response.data.data["valence"]
			this.setHistory(song_id, valence);
		}
		else{
			return([])
		}
	}).catch(err => {
		console.log("Valence Fetch FAILED!!! ", err)
		return([])
	})
}


// This plays the song of the card clicked
playSong(song_id, event)
{
	this.setState({currentSong:"https://open.spotify.com/embed/track/"+song_id}, this.getValenceFromAPIBroker(song_id))
	ToastStore.success("Song has been loaded to the player! Please click play below!!");
}


//----------------function to search for songs----------------------//
searchSongs()
{
	var query=document.getElementById("searchQuery").value;
	return axios
	({
		method:'post',
		url:config.apiBrokerHost+'/searchSong',
		data:{
			q:query,
			access_token:sessionStorage.getItem('spotifyToken')
		},
		headers: {
			'Access-Control-Allow-Headers': '*',
			'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
		}

	})
	.then((response)=>
	{

		if(response.status === 200)
		{
			console.log(response.data.data.tracks.items)
			this.setState({searchResults: response.data.data.tracks.items})
			this.setState({isSearchResultsVisible: true})
		}
		else{

			return([])
		}
	}).catch(err => {
		console.log("No search results ", err)
		if(err.status==401){
			window.location.href = "/login";
		}
		return([])
	})
}

//--------------------function to handle enter key eventfor searchbar----------------------//
handleEnterKey(event)
{
	if (event.key === 'Enter') {
		var query=document.getElementById("searchQuery").value;
		this.searchSongs()
	}
}

changeMood()
{

}

render()
{
	let resultsDiv;
	let recommendDiv;

	if(this.state.isSearchResultsVisible){
		resultsDiv = <div name="searchResults">
		<div className="RecommendedSongsView">
		<div className="RecommendationTitle ">
		<h4>Here are some songs!</h4>
		</div>
		</div>
		{
			this.state.searchResults.map((el,i) => (
				<Card onClick = {this.playSong.bind(this, el.id)} key={i} style={this.state.songCardStyle}>
				<CardMedia image = {el.album.images[0].url} style= {{height: "inherit", cursor: "pointer",
				background: "linear-gradient( rgba(0, 0, 0, 0), rgba(42, 42, 42, 0.61), '#0000007a'"}}>

				<div name="songDetails" style={{height:'inherit'}}>
				<div name="titleSong"
				style= {{textAlign: "center", verticalAlign: "middle", lineHeight: "140px", height:'inherit', color:"white", fontWeight: "bold", fontSize: 25}}>
				{el.name}
				</div>
				</div>

				</CardMedia>
				</Card>))
			}
			</div>
		}
		else{
			resultsDiv = <div></div>
		}


		if(this.state.isRecommendationsVisible){
			recommendDiv = <div name = "recoResults">
			<div className="RecommendedSongsView">
			<div className="RecommendationTitle ">
			<h4>We think you'll like these</h4>
			</div>
			</div>
			{
				this.state.arrayOfRecommended.map((el,i) => (
					<Card onClick = {this.playSong.bind(this, el.id)} key={i} style={this.state.songCardStyle}>
					<CardMedia image = {el.album.images[0].url} style= {{height: "inherit", cursor: "pointer",
					background: "linear-gradient( rgba(0, 0, 0, 0), rgba(42, 42, 42, 0.61), '#0000007a'"}}>

					<div name="songDetailsRec" style={{height:'inherit'}}>
					<div name="titleSongRec"
					style= {{textAlign: "center", verticalAlign: "middle", lineHeight: "140px", height:'inherit', color:"white", fontWeight: "bold", fontSize: 25}}>
					{el.name}
					</div>
					</div>

					</CardMedia>
					</Card>))
				}

				</div>
			}
			else{
				recommendDiv = <div> </div>
			}


			return(
				<div>
				
				<div className="MoodBox">
				<h2>How are you feeling today? </h2>
				</div><br /><br />
				<div className="wrapper">
				<div className="gauge green">
				<p className="gauge__values" onClick={this.changeMood}>
				I am feeling
				<span className="gauge_rating">Good</span>
				</p>
				<svg xmlns="http://www.w3.org/2000/svg" width="241" height="241" viewBox="0 0 241 241"><circle cx="120.5" cy="120.5" r="120.5" className="outer_ring"/><path d="M167.9 18.4C153.5 11.7 137.4 8 120.5 8c-19.7 0-38.3 5.1-54.4 14l15.3 24.7c11.7-6.2 25-9.7 39.1-9.7 11.3 0 22.1 2.3 32 6.3l15.4-24.9z" class="ring_orange"/><path d="M152.5 43.3c23.9 9.9 42.2 30.6 48.8 56l27.3-10.2C219.4 57.7 197 32 167.9 18.4l-15.4 24.9z" class="ring_purple"/><path d="M38.1 106.9c4.2-25.9 21-48.1 43.3-60.2L66.1 22C37.7 37.7 16.8 65.4 10.2 98.2l27.9 8.7z" class="ring_yellow"/><path d="M54.4 171.6C43.5 157.5 37 139.7 37 120.5c0-4.7.4-9.2 1.1-13.7l-27.8-9C8.8 105.2 8 112.7 8 120.5c0 27.2 9.6 52.1 25.7 71.6l20.7-20.5z" class="ring_green"/><path d="M207 192.4c16.2-19.5 26-44.6 26-71.9 0-10.9-1.6-21.5-4.5-31.4l-27.3 10.2c1.8 6.8 2.7 13.9 2.7 21.2 0 19.7-6.8 37.8-18.3 52.1l21.4 19.8z" class="ring_red"/><g class="type"></g><path d="M102.3 190.1c-31.4-8.1-54.6-36.6-54.6-70.5 0-40.2 32.6-72.8 72.8-72.8s72.8 32.6 72.8 72.8c0 33.9-23.2 62.5-54.6 70.5l-18.3 17.7-18.1-17.7z" class="spinner" transform='rotate(75 120 120)' /></svg>
				</div>
				</div>
				<br /><br />

				
				<div id="particles-js" className="search-box">
				<input className="search-txt" type="text" id="searchQuery" placeholder="Search" onKeyPress={this.handleEnterKey}/>
				<a className="search-btn" href="#">
				<i className="fa fa-search"></i>
				</a>
				</div>


				{resultsDiv}


				
				{recommendDiv}

				
				<div className="player">
				<iframe src={this.state.currentSong} width="100%" height="20%" top="500px" position="relative" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
				</div>
				<ToastContainer position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore}/>
				</div>
			);
		}


	}
	export default Homepage
