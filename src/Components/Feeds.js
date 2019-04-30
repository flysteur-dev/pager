import React, { Component } from 'react';
import { DbContext } from '../Helpers/Db';
import { PROXY_PATH, FAVICON_PROVIDER } from '../Helpers/Constants';
import Parser from 'rss-parser';
import Feed from './Feed';

class Feeds extends Component {

	constructor(props) {
		super(props);

		this.state = {
			rss: '',
			feeds: this.props.feeds,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.feeds !== this.props.feeds) {
			this.setState({ feeds: nextProps.feeds });
		}
	}

	handleChange = (event) => {
		this.setState({rss: event.target.value.trim()});
	}

	closeFeed = () => {
		// Hide feeds list
		document.getElementsByClassName('App-Feeds')[0].classList.add("hide");
	}

	addFeed = async () => {
		if (this.state.rss === "") {
			return;
		}

		let feed = {
			_id:   this.state.rss,
			uri:   this.state.rss,
			title: this.state.rss,
			icon:  ''
		};

		//Trying to fetch xml feed
		try {
			let parser = new Parser();
			let uri = `${PROXY_PATH}${this.state.rss}`;

			let info = await parser.parseURL(uri);
			if (info.title) {
				//Add feed title
				feed.title = info.title;
			}

			//Use google as favicon provider (o_O)
			let base = info.link || this.state.rss;
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
		} catch (e) {
			console.error(`Unable to add feed: ${this.state.rss} reason: ${e}`);
			alert("Ooops something goes wrong..");
			return;
		}

		try {
			await this.context.db_feeds.put(feed);
			this.setState({rss: '', feeds: [...this.state.feeds, ...[feed]] });
		} catch(e) {
			console.error(`Unable to add feed: ${this.state.rss} reason: ${e}`);
		}
	}

	render() {
		return (
			<div className="App-Feeds hide">
				<h1>Pager <span className="App-Feeds-Toggle" onClick={this.closeFeed}>x</span></h1>
				<input
					className="App-Feeds-Input"
					type="text"
					ref={c => (this._input = c)}
					value={this.state.rss}
					onChange={this.handleChange}
					placeholder="Add your rss feed link here.."
				/>
				<button className="App-Feeds-Add" onClick={this.addFeed}>ADD (+)</button>

				<ul>
					{this.state.feeds.map((feed) => (
						<Feed key={feed._id} id={feed._id} icon={feed.icon} title={feed.title} uri={feed.uri} unread={feed.unread} />
					))}
				</ul>
			</div>
		);
	}
}

Feeds.contextType = DbContext;
export default Feeds;