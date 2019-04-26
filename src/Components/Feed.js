import _ from 'lodash';
import React, { Component } from 'react';
import { DbContext } from '../Helpers/Db';
import Parser from 'rss-parser';

class Feed extends Component {

	constructor(props) {
		super(props);

		this.listener = null;
		this.state    = {
			loading: true,
			id:      this.props.id,
			icon:    this.props.icon,
			title:   this.props.title,
			uri:     this.props.uri,
			unread:  this.props.unread || []
		}
	}

	async componentDidMount() {
		//Attach listner
		this.onFeedChange();

		let parser = new Parser();
		let uri = `http://localhost:8080/${this.state.uri}`;

		try {
			let feed     = await parser.parseURL(uri);
			let newItems = [];

			feed.items.forEach(item => {
				newItems.push({
					_id:    item.guid,
					feedId: this.state.id,
					icon:   this.state.icon,
					title:  item.title,
					desc:   item.contentSnippet,
					date:   item.isoDate,
					link:   item.link,
					unread: true
				});
			});

			//Try to add new document
			//If document already exist coucheDB will fail with conflict
			let result = await this.context.db_feeds_items.bulkDocs(newItems);
			//Keep only successful new insertion
			result = result.filter(item => item.ok === true);
			this.setState({ loading: false, unread: _.uniq([...this.state.unread, ...result.map(item => item.id)]) });
		} catch(e) {
			console.error(`Unable to fetch feed: ${uri} reason: ${e}`);
		}
	}

	componentWillUnmount() {
		this.listener.cancel();
		this.listener = null;
	}

	onFeedChange = () => {
		//Attach listener for new feed changes
		this.listener = this.context.db_feeds_items.changes({
			since: 'now',
			live: true,
			include_docs: true
		}).on('change', (item) => {
			//console.log("change item", item);
		});
	}

	filter = () => {
		//TODO: Filter only this feed
		alert("Not implemented.");
	}

	render() {
		console.error(this.state);
		return (
			<li onClick={this.filter}>
				<div className="n">{(this.state.loading) ? '...' : this.state.unread.length}</div>
				<div className="i"><img src={this.state.icon} /></div>
				<div className="t">{this.state.title}</div>
			</li>
		)
	}
}

Feed.contextType = DbContext;
export default Feed;