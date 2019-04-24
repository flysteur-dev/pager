import React, { Component } from 'react';

class Feed extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			icon:    this.props.icon,
			title:   this.props.title,
			new:     1
		}
	}

	async componentDidMount() {

	}

	render() {
		return (
			<li>
				<div className="n">{this.state.new}</div>
				<div className="i"><img src={this.state.icon} /></div>
				<div className="t">{this.state.title}</div>
			</li>
		)
	}
}

export default Feed;