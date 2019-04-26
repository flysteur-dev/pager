import React, { Component } from 'react';
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
		this.listener = this.context.db.changes({
			since: 'now',
			live: true,
			include_docs: true
		}).on('change', (item) => {

			//Add item to current feed list
			this.setState({ items: [...this.state.items, ...[item.doc]]});
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
	load = (e, item) => {
		if (false) {
			//TODO: Dismiss default action and open it in embeded viewer
			e.preventDefault();
			return false;
		}

		//TODO: Mark as read
	}

	render() {
		return (
			<div className="App-List">
				<ul>
					{this.state.items.map((item) => (
						<a key={item._id} href={item.link} target="_blank" onClick={(e) => this.load(e, item)}>
							<li className={item.unread ? 'unread' : ''}>
								<div className="i"><img src={item.icon} /></div>
								<div className="ts">{item.date}</div>
								<div className="t">{item.title}</div>
								<div className="d">{item.desc.substring(0, 100)}...</div>
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