import React, { Component } from 'react';

class List extends Component {

	constructor(props) {
		super(props);

		this.state = {
			list: this.props.list
		}
	}

	render() {
		return (
			<div className="App-List">
				<ul>
					{this.state.list.map((item) => (
						<li className={item.unread ? 'unread' : ''}>
							<div className="i"><img src={item.icon} /></div>
							<div className="ts">43mn</div>
							<div className="t">{item.title}</div>
							<div className="d">{item.desc}</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default List;