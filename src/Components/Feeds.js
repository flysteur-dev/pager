import React, { Component } from 'react';
import Feed from './Feed';

class Feeds extends Component {

	constructor(props) {
		super(props);

		this.state = {
			feeds: this.props.feeds
		}
	}

	addFeed = () => {
		alert("Not implemented.");
	}

	render() {
		return (
			<div className="App-Feeds">
				<h1>Pager</h1>
				<button className="add" onClick={this.addFeed}>ADD (+)</button>
				<ul>
					{this.state.feeds.map((feed) => (
						<Feed icon={feed.icon} title={feed.title} uri={feed.uri} />
					))}
				</ul>
			</div>
		);
	}
}

export default Feeds;