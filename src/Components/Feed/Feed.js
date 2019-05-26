import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DbContext } from '../../Helpers/Db';
import { PROXY_PATH } from '../../Helpers/Constants';
import Parser from 'rss-parser';

class Feed extends Component {

	constructor(props) {
		super(props);

		this.listener = null;
		this.state    = {
			loading: true,
			id:      this.props.feed._id,
			icon:    this.props.feed.icon,
			title:   this.props.feed.title,
			uri:     this.props.feed.uri,
			created: this.props.feed.created || 0,
			unread:  this.props.feed.unread  || []
		}
	}

	async componentDidMount() {
		//Attach listner
		this.onFeedChange();

		let parser = new Parser();
		let uri = `${PROXY_PATH}${this.state.uri}`;

		try {
			let feed     = await parser.parseURL(uri);
			let newItems = [];

			feed.items.forEach(item => {

				let date = item.isoDate || (item.pubDate) ? item.pubDate.replace(/CET|CEST/gi, '') : moment();
				let ts   = moment(date).unix();

				//Add only new items since feed was imported
				if (ts >= this.state.created) {
					newItems.push({
						_id:      item.guid || item.id,
						feedId:   this.state.id,
						icon:     this.state.icon,
						title:    item.title,
						desc:     item.contentSnippet,
						content:  item["content:encoded"] || item.content,
						date:     ts,
						link:     item.link,
						unread:   true,
						favorite: false,
					});
				}
			});

			//Try to add new document
			//If document already exist coucheDB will fail with conflict
			let result = await this.context.db_feeds_items.bulkDocs(newItems);
			//Keep only successful new insertion
			result = result.filter(item => item.ok === true);
			this.setState({ loading: false, unread: _.uniq([...this.state.unread, ...result.map(item => item.id)]) });
			//Notify parent feeds load
			this.props.loaded(this.state);
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

			//Remove item from unread
			if (_.indexOf(this.state.unread, item.doc._id) !== -1 && item.doc.unread === false) {
				this.setState({unread: this.state.unread.filter(current => current !== item.doc._id)})
			}
		});
	}

	filter = () => {
		//TODO: Filter only this feed
		console.warn("Not implemented.");
	}

	render() {
		return (
			<li onClick={this.filter} title={this.state.title}>
				<div className="n">{(this.state.loading) ? '...' : this.state.unread.length}</div>
				<div className="i"><img src={this.state.icon} alt="-" /></div>
				<div className="t">{(this.state.title) ? this.state.title.substring(0, 30) : ''}</div>
			</li>
		)
	}
}

Feed.propTypes = {
	feed: PropTypes.object.isRequired,
	feed: PropTypes.shape({
		_id:   PropTypes.string.isRequired,
		icon:  PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		uri:   PropTypes.string.isRequired
	}),
};

Feed.contextType = DbContext;
export default Feed;