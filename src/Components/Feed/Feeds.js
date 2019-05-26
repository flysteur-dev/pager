import React, { Component } from 'react';
import { DbContext } from '../../Helpers/Db';
import Parser from 'rss-parser';
import Feed from './Feed';
import { CloseIcon } from '../Icon/Icon';
import { NewUserAlert } from '../Alert/Alert';
import {
	PROXY_PATH,
	FAVICON_PROVIDER,
	ONBOARDING_FEED
} from '../../Helpers/Constants';
import './Feeds.scss';

class Feeds extends Component {

	constructor(props) {
		super(props);

		this.lastupdate = (Date.now() / 1000).toFixed();
		this.loaded     = 0;
		this.state      = {
			rss:     '',
			loading: true,
			feeds:   this.props.feeds,
		}
	}

	componentDidMount() {
		document.addEventListener("visibilitychange", this.handleAppForeground);
	}

	componentWillUnmount() {
		document.removeEventListener("visibilitychange", this.handleAppForeground)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.feeds !== this.props.feeds) {
			this.setState({ feeds: nextProps.feeds, loading: false });
		}
	}

	handleChange = (event) => {
		this.setState({ rss: event.target.value.toLowerCase().trim()});
	}

	handleOpmlFileChange = (event) => {
		if (event.target.files.length === 0) return;

		let fileReader = new FileReader();
		fileReader.onloadend = () => {
			if(fileReader.result === "") return;
			if(fileReader.result.startsWith('<?xml') === false) {
				alert("Please upload a valid opml file.");
				return;
			}

			//1- Extract all xmlUrl
			let urls = fileReader.result.match(/xmlUrl="(.*?)"/g);

			//2- Add feed
			urls.forEach((feed, i) => {
				feed = feed.replace('xmlUrl="', '').slice(0, -1);
				setTimeout(() => {
					this.addFeed(feed, true);
				}, i * 100);
			});
		}

		fileReader.readAsText(event.target.files[0]);
	}

	handleAppForeground = (event) => {
		//Trigger automatic update on app foreground
		//Update only if lastupdate < 1 minute
		//User can still force update with pull-to-refresh
		if (this.lastupdate <= (Date.now() / 1000).toFixed() - 60) {
			let feeds       = this.state.feeds;
			this.lastupdate = (Date.now() / 1000).toFixed();

			//Force update
			//TODO: (0_') burk..
			this.loaded = 0;
			this.setState({ feeds: [] });
			this.setState({ feeds });
		}
	}

	closeFeed = () => {
		// Hide feeds list
		document.getElementsByClassName('App-Feeds')[0].classList.add("hide");
	}

	addFeed = async (link, fromOPML = false) => {
		let rss = link;

		// Test feed validity
		if (rss === "") {
			alert("Please add rss feed link first.");
			return;
		}

		if (!/^(http|https):\/\//.test(rss)) {
			alert("Missing http/https scheme.");
			return;
		}

		// Loader
		this.setState({ loading: true });

		let feed = {
			_id:     rss,
			uri:     rss,
			title:   rss,
			icon:    '',
			created: (fromOPML) ? parseInt(Date.now() / 100) : 0
		};

		//Trying to fetch xml feed
		try {
			let parser = new Parser();
			let uri = `${PROXY_PATH}${rss}`;

			let info = await parser.parseURL(uri);
			if (info.title) {
				//Add feed title
				feed.title = info.title;
			}

			//Use google as favicon provider (o_O)
			if (window.fetch) {
				let base = info.link || rss;
				let icon = await fetch(`${PROXY_PATH}${FAVICON_PROVIDER}${base}`);
				await icon.arrayBuffer().then((buffer) => {
					//Read stream
					var binary     = '';
					var bytes      = [].slice.call(new Uint8Array(buffer));
						bytes.forEach((b) => binary += String.fromCharCode(b));
					var imageStr   = window.btoa(binary);

					//Save icon as base64
					feed.icon = `data:image/png;base64,${imageStr}`;
				});
			}
		} catch (e) {
			this.setState({ loading: false });
			console.error(`Unable to add feed: ${rss} reason: ${e}`);
			return;
		}

		try {
			await this.context.db_feeds.put(feed);
			this.setState({
				loading: false,
				rss:     '',
				feeds:   [...this.state.feeds, ...[feed]]
			});
		} catch(e) {
			this.setState({ loading: false });
			console.error(`Unable to add feed: ${rss} reason: ${e}`);
		}
	}

	onFeedLoad = () => {
		// Counting feed load
		this.loaded = this.loaded + 1;
		if (this.loaded === this.state.feeds.length) {
			this.setState({ loading: false });
		}
	}

	addDefaultFeed = () => {
		// Adding onboarding feed
		this.addFeed(ONBOARDING_FEED);
	}

	render() {
		return (
			<div className="App-Feeds-Container">
				{ /* Loader */}
				<div className="App-Feeds-Loader">
					{ (this.state.loading) && <div className="loader"></div> }
				</div>

				{ /* Onboarding if empty feeds */}
				{ (this.state.feeds.length === 0 && !this.state.loading) && <NewUserAlert triggerOK={this.addDefaultFeed} /> }

				{ /* Manage feeds */}
				<div className="App-Feeds hide">
					<h1>
						<img alt="pager" src={process.env.PUBLIC_URL + '/favicon.png'} />
						<button className="App-Feeds-Toggle" onClick={this.closeFeed}>
							<CloseIcon />
						</button>
					</h1>

					{ /* Http link */ }
					<input
						className="App-Feeds-Input"
						type="text"
						ref={c => (this._input = c)}
						value={this.state.rss}
						onChange={this.handleChange}
						placeholder="| Add rss feed link here.."
					/>

					{ /* OPML */ }
					<label
						className="App-Feeds-Input-OPML"
						htmlFor="opml-file-trigger">
						OPML
					</label>
					<input
						id="opml-file-trigger"
						type="file"
						onChange={this.handleOpmlFileChange}
						style={{display:'none'}}
					/>

					{this.state.loading ? (
						<button
							disabled
							className="App-Feeds-Add">
							LOADING...
						</button>
					) : (
						<button
							className="App-Feeds-Add"
							onClick={() => this.addFeed(this.state.rss)}>
							ADD (+)
						</button>
					)}

					<ul>
						{this.state.feeds.map((feed) => (
							<Feed
								key={feed._id}
								feed={feed}
								loaded={this.onFeedLoad}
							/>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

Feeds.contextType = DbContext;
export default Feeds;