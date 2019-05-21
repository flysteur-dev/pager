import React, { Component } from 'react';
import { DbContext } from '../Helpers/Db';
import Parser from 'rss-parser';
import Feed from './Feed';
import { CloseIcon } from './Icon';
import { NewUserAlert } from './Alert';
import {
	PROXY_PATH,
	FAVICON_PROVIDER,
	ONBOARDING_FEED
} from '../Helpers/Constants';

class Feeds extends Component {

	constructor(props) {
		super(props);

		this.lastupdate = (Date.now() / 1000).toFixed();
		this.state      = {
			rss:     '',
			loading: true,
			loaded:  0,
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

	handleAppForeground = (event) => {
		//Trigger automatic update on app foreground
		//Update only if lastupdate < 1 minute
		//User can still force update with pull-to-refresh
		if (this.lastupdate <= (Date.now() / 1000).toFixed() - 60) {
			let feeds       = this.state.feeds;
			this.lastupdate = (Date.now() / 1000).toFixed();

			//Force update
			//TODO: (0_') burk..
			this.setState({ feeds: [], loaded: 0 });
			this.setState({ feeds });
		}
	}

	closeFeed = () => {
		// Hide feeds list
		document.getElementsByClassName('App-Feeds')[0].classList.add("hide");
	}

	addFeed = async (link) => {
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
			_id:   rss,
			uri:   rss,
			title: rss,
			icon:  ''
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
			alert("Ooops something goes wrong..");
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
		// Listening feed load
		this.setState({ loaded: this.state.loaded + 1 });
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
					{ (this.state.loading || (this.state.feeds.length !== this.state.loaded)) && <div className="loader"></div> }
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

					<input
						className="App-Feeds-Input"
						type="text"
						ref={c => (this._input = c)}
						value={this.state.rss}
						onChange={this.handleChange}
						placeholder="Add rss feed link here.."
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
							<Feed key={feed._id} id={feed._id} icon={feed.icon} title={feed.title} uri={feed.uri} unread={feed.unread} loaded={this.onFeedLoad} />
						))}
					</ul>
				</div>
			</div>
		);
	}
}

Feeds.contextType = DbContext;
export default Feeds;