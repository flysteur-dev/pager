import React, { Component } from 'react';

class List extends Component {

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
					{this.props.items.map((item) => (
						<a href={item.link} target="_blank" onClick={(e) => this.load(e, item)}>
							<li className={item.unread ? 'unread' : ''}>
								<div className="i"><img src={item.icon} /></div>
								<div className="ts">{item.date}</div>
								<div className="t">{item.title}</div>
								<div className="d">{item.desc.substring(0, 100)}</div>
							</li>
						</a>
					))}
				</ul>
			</div>
		);
	}
}

export default List;