import _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';
import { DbContext } from '../Helpers/Db';

class List extends Component {

	constructor(props) {
		super(props);

		this.listener = null;
		this.state    = {
			loading: true,
			items:   this.props.items
		}
	}

	componentDidMount() {
		//Attach listener for new feed changes
		this.listener = this.context.db_feeds_items.changes({
			since:        'now',
			live:         true,
			include_docs: true
		}).on('change', (item) => {
			//TODO: Improve mark as read should not trigger full render

			//Is this item already exist
			let isExist = this.state.items.filter(current => current._id === item.doc._id);
			if (isExist.length > 0) {
				//Update existing item
				this.setState({ items: this.state.items.map(current => (
					current._id === item.doc._id ? Object.assign({}, current, item.doc) : current
				))});
			} else {
				//Add new item to feed list
				this.setState({ items: [...this.state.items, ...[item.doc]] });
			}
		});
	}

	componentWillUnmount() {
		this.listener.cancel();
		this.listener = null;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.items !== this.props.items) {
			this.setState({ loading: false, items: nextProps.items });
		}
	}

	openFeedList = () => {
		//Only mobile
		//Open left panel to manage feeds
		document.getElementsByClassName('App-Feeds')[0].classList.remove("hide");
	}

	markAllAsRead = async () => {
		try {
			//Mark all items as read
			let items = this.state.items;
			items.map((item) => { item.unread = false; })

			//Bulk update
			await this.context.db_feeds_items.bulkDocs(items);
		} catch (e) {
			console.warn(`Unable to mark all as read, reason: ${e}`);
		}
	}

	// Open link target in a new tab or inside the embeded viewer
	load = async (e, item) => {
		if (false) {
			//TODO: Dismiss default action and open it in embeded viewer
			e.preventDefault();
			return false;
		}

		try {
			//Mark as read
			var item = await this.context.db_feeds_items.get(item._id);
				item.unread = false;

			await this.context.db_feeds_items.put(item);
		} catch(e) {
			console.warn(`Unable to mark as read item: ${item._id} reason: ${e}`);
		}
	}

	render() {
		let emptyView = (
			<div className="App-List-Empty">
				<h1>(o_O)</h1>
				<p>There is nothing to see right now..</p>
			</div>
		);
		let loadingView = (
			<div className="App-List-Empty">
				<p>loading...</p>
			</div>
		);
		let markAsReadButton = (
			<div className="App-List-Mark-As-Read-Button" onClick={this.markAllAsRead}>
				<p>MARK ALL AS READ</p>
			</div>
		);


		//Order by date DESC
		let orderedItems = _.sortBy(this.state.items, [(o) => { return -o.date }]);

		//Unread items
		let unreadItems  = this.state.items.filter(item => item.unread === true);

		return (
			<div className="App-List">
				<div className="App-List-Options">
					<button onClick={this.openFeedList}>Feeds</button>
				</div>
				<ul>
					{orderedItems.map((item) => (
						<a key={item._id} href={item.link} onClick={(e) => this.load(e, item)} target="_blank" rel="noopener noreferrer">
							<li className={item.unread ? 'unread' : ''}>
								<div className="i"><img src={item.icon} /></div>
								<div className="ts">{moment.unix(item.date).fromNow(true)}</div>
								<div className="t">{(item.title) ? item.title.substring(0, 150) : ''}</div>
								<div className="d">{(item.desc) ? item.desc.substring(0, 180) : ''}...</div>
							</li>
						</a>
					))}
				</ul>

				{(this.state.loading === true) && loadingView}
				{(this.state.loading === false && orderedItems.length === 0) && emptyView}
				{(unreadItems.length > 0) && markAsReadButton}
			</div>
		);
	}
}

List.contextType = DbContext;
export default List;