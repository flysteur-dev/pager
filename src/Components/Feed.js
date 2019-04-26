import React, { Component } from 'react';
import { DbContext } from '../Helpers/Db';
import Parser from 'rss-parser';

class Feed extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			icon:    this.props.icon,
			title:   this.props.title,
			uri:     this.props.uri,
			new:     null
		}
	}

	async componentDidMount() {
		let parser = new Parser();
		let uri = `http://localhost:8080/${this.state.uri}`;

		try {
			let feed      = await parser.parseURL(uri);
			let newitems  = feed.items.length;

			feed.items.forEach(async item => {
				try {
					//Try to add document
					//If document already exist fail with conflict
					await this.context.db.put({
						_id:    item.guid,
						icon:   this.state.icon,
						title:  item.title,
						desc:   item.contentSnippet,
						date:   item.isoDate,
						link:   item.link,
						unread: true
					});
				} catch(e) {
					console.log(`Unable to add item: ${item.guid} to db reason: ${e}`);
				}
			});

			this.setState({ loading: false, new: newitems });
		} catch(e) {
			console.error(`Unable to fetch feed: ${uri} reason: ${e}`);
		}
	}

	render() {
		return (
			<li>
				<div className="n">{(this.state.loading) ? '...' : this.state.new}</div>
				<div className="i"><img src={this.state.icon} /></div>
				<div className="t">{this.state.title}</div>
			</li>
		)
	}
}

Feed.contextType = DbContext;
export default Feed;