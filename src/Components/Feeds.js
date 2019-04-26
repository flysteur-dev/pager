import React, { Component } from 'react';
import { DbContext } from '../Helpers/Db';
import Feed from './Feed';

class Feeds extends Component {

	constructor(props) {
		super(props);

		this.state = {
			feeds: this.props.feeds
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.feeds !== this.props.feeds) {
			this.setState({ feeds: nextProps.feeds });
		}
	}

	addFeed = async () => {
		//Adding new feed
		//TODO: Delete
		let feeds = [
			{ _id: "https://korben.info/rss", title: "Korben", icon: "https://korben.info/app/themes/korben/dist/favicons/favicon-32x32.png", uri: "https://korben.info/rss" },
			{ _id: "https://www.nextinpact.com/rss/news.xml", title: "Next INpact", icon: "https://www.nextinpact.com/Images/favicon.ico", uri: "https://www.nextinpact.com/rss/news.xml" }
		]

		try {
			this.context.db_feeds.bulkDocs(feeds);
			this.setState({ feeds });
		} catch(e) {
			//Unable to add feeds
		}

		alert("Not implemented.");
	}

	render() {
		return (
			<div className="App-Feeds">
				<h1>Pager</h1>
				<button className="add" onClick={this.addFeed}>ADD (+)</button>
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