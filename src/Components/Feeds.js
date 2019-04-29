import React, { Component } from 'react';
import { DbContext } from '../Helpers/Db';
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
		this.setState({rss: event.target.value});
	}

	closeFeed = () => {
		// Hide feeds list
		document.getElementsByClassName('App-Feeds')[0].classList.add("hide");
	}

	addFeed = async () => {
		if (this.state.rss == "") {
			return;
		}

		//TODO: Automaticaly add favicon
		//TODO: Check url validity
		let feed = {
			_id:   this.state.rss,
			title: this.state.rss,
			uri:   this.state.rss,
			icon:  ''
		};

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
					placeholder="RSS feed ( xml / atom )"
				/>
				<button className="App-Feeds-Add" onClick={this.addFeed}>ADD (+)</button>

				<ul>
					{this.state.feeds.map((feed) => (
						<Feed id={feed._id} icon={feed.icon} title={feed.title} uri={feed.uri} unread={feed.unread} />
					))}
				</ul>
			</div>
		);
	}
}

Feeds.contextType = DbContext;
export default Feeds;