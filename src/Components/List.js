import _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';
import { DbContext } from '../Helpers/Db';

class List extends Component {

	constructor(props) {
		super(props);

		this.listener = null;
		this.state    = {
			items: this.props.items
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
			let isExist = this.state.items.filter(current => current._id == item.doc._id);
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
			this.setState({ items: nextProps.items });
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

		//Order by date DESC
		let orderedItems = _.sortBy(this.state.items, [(o) => { return -o.date }]);

		return (
			<div className="App-List">
				<ul>
					{orderedItems.map((item) => (
						<a key={item._id} href={item.link} target="_blank" onClick={(e) => this.load(e, item)}>
							<li className={item.unread ? 'unread' : ''}>
								<div className="i"><img src={item.icon} /></div>
								<div className="ts">{moment.unix(item.date).fromNow(true)}</div>
								<div className="t">{item.title}</div>
								<div className="d">{item.desc.substring(0, 200)}...</div>
							</li>
						</a>
					))}
				</ul>
			</div>
		);
	}
}

List.contextType = DbContext;
export default List;