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
		moodArray: [
		{
			moodName:"Good",
			moodValence:0.85
		},
		{
			moodName:"Okay",
			moodValence:0.65
		},
		{
			moodName:"Meh",
			moodValence:0.50
		},
		{
			moodName:"Yikes",
			moodValence:0.35
		},
		{
			moodName:"Sad",
			moodValence:0.15
		}
		],
		searchResultMessage:'',
		moodBoxStyle:{marginBottom: 18, width: 150, height: 150, marginRight: 18, display: 'inline-block', paddingRight:200,textAlign: 'center',color:'black'},
	};
	this.searchSongs=this.searchSongs.bind(this)
	this.playSong=this.playSong.bind(this)
	this.handleEnterKey=this.handleEnterKey.bind(this)
	this.getValenceFromAPIBroker = this.getValenceFromAPIBroker.bind(this)
	this.setHistory = this.setHistory.bind(this)
	this.getRecommendedValence = this.getRecommendedValence.bind(this)
	this.moodSearch=this.moodSearch.bind(this)

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
			console.log("Reco valence response: ",response.data)
			var recommendedValence = response.data.data;
			if(response.data.message != "No history")
			{
				this.getRecommendedTrackList(recommendedValence)
			}
			else{
				ToastStore.info("You have not listened to any song yet :( ");
				console.log("USER HAS NO HISTORY!!!")
			}
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
setHistory(song, valence){
	axios
	({
		method:'post',
		url:config.profileServices+'/setHistoryAndMood',
		data:{
			songId: song,
			valence: valence
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
		}

	})
	.then((response)=>
	{
		console.log("setting history response: ", response.data)
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
getValenceFromAPIBroker(song_id, song){
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
			this.setHistory(song, valence);
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
playSong(song, event)
{
	console.log("Entire song obj", song)
	var song_id = song.id
	this.setState({currentSong:"https://open.spotify.com/embed/track/"+song_id}, this.getValenceFromAPIBroker(song_id, song))
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
			var resultList = response.data.data.tracks.items
			if( resultList.length > 0)
			{
				this.setState({searchResults: response.data.data.tracks.items})
				this.setState({isSearchResultsVisible: true,
					searchResultMessage:""
				})
				console.log("results found")
				
			}
			else{
				this.setState({isSearchResultsVisible: false,
					searchResultMessage:"No results Found"
				})

			console.log(" NO REEEESULLTS")
			}
		}
		else{
			this.setState({isSearchResultsVisible: false})
			console.log("SEARCH RESPONSE WAS NOT 200 NOR ERROR!", response)
			return([])
		}
	}).catch(err => {

		this.setState({isSearchResultsVisible: false})

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

moodSearch(valence)
{
	console.log("moodSearch called",valence)
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
			console.log("seaerch by mood success",response)
			var searchRes = response.data.data;
			this.setState({searchResults: searchRes})
			this.setState({isSearchResultsVisible: true})
		}
		else{

			return([])
		}
	}).catch(err => {

		console.log("Couldn't get mood serach:( ", err)
		// if(err.response.status==401){
		// 	window.location.href = "/login";
		// }
		console.log(err)
		return([])
	})
}

render()
{
	let resultsDiv;
	let recommendDiv;

	if(this.state.isSearchResultsVisible){
		resultsDiv = <div name="searchResults">
		<div className="RecommendedSongsView">
		<div className="RecommendationTitle ">
		<h4>Here are some songs!</h4><br />
		</div>
		</div>
		{
			this.state.searchResults.map((el,i) => (
				<Card onClick = {this.playSong.bind(this, el)} key={i} style={this.state.songCardStyle}>
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
			resultsDiv = <div><h4 style={{color:"red"}}>{this.state.searchResultMessage}</h4></div>
		}



		if(this.state.isRecommendationsVisible){
			recommendDiv = <div name = "recoResults">
			<div className="RecommendedSongsView">
			<div className="RecommendationTitle ">
			<h4>We think you'll like these</h4><br />
			</div>
			</div>
			{
				this.state.arrayOfRecommended.map((el,i) => (
					<Card onClick = {this.playSong.bind(this, el)} key={i} style={this.state.songCardStyle}>
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
				
				<div className="moodBox" style={{paddingBottom:"4%"}}>
				<h3 style={{color:"white"}}>How are you feeling today?</h3><br />
				{
					this.state.moodArray.map((el2,i2) => (
						<Card onClick={this.moodSearch.bind(this,el2.moodValence)} key={i2} style={this.state.moodBoxStyle}>
						<CardMedia image={"https://images.unsplash.com/photo-1549526872-0ceec67855e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"} style= {{height: "inherit", cursor: "pointer",
						background: "linear-gradient( rgba(0, 0, 0, 0), rgba(42, 42, 42, 0.61), '#0000007a'"}}>

						<div name="" style={{height:'inherit'}}>
						<div name=""
						style= {{textAlign: "center", verticalAlign: "middle", lineHeight: "140px", height:'inherit', color:"black", fontWeight: "bold", fontSize: 25}}>
						{el2.moodName}
						</div>
						</div>

						</CardMedia>
						</Card>))
				}
				</div>
			
		
				<div class="row">
				<div className="col-sm-3"></div>
				<div className="col-sm-6" style={{paddingBottom:"4%"}}><input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search For a Song" style={{borderRadius:15,textAlign:"left"}} id="searchQuery" aria-label="Search" onKeyPress={this.handleEnterKey} />
				</div></div>
				
				<div style={{paddingBottom:'2%'}}>
					{resultsDiv}
				</div>

				<div style={{paddingTop:'2%', paddingBottom:'2%'}}>				
					{recommendDiv}
				</div>
				
				<div className="player ">
				<iframe src={this.state.currentSong} width="100%" height="20%" top="500px" position="relative" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
				</div>
				<ToastContainer position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore}/>
				</div>
			);
		}


	}
	export default Homepage
