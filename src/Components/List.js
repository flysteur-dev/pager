import React, { Component } from 'react';

class List extends Component {

	render() {
		return (
			<div className="App-List">
				<ul>
					{this.props.items.map((item) => (
						<li className={item.unread ? 'unread' : ''}>
							<div className="i"><img src={item.icon} /></div>
							<div className="ts">{item.date}</div>
							<div className="t">{item.title}</div>
							<div className="d">{item.desc.substring(0, 100)}</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default List;