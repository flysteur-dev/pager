import React, { Component } from 'react';

class News extends Component {

	constructor(props) {
		super(props);

		this.state = {
			feedsList: []
		}
	}

	render() {
		return (
			<div className="App-News">
				<ul>
					<li>
						<div className="i"><img src="https://www.google.com/s2/favicons?domain=www.calculatedriskblog.com" /></div>
						<div className="t">Calculated Risk</div>
						<div className="d">Chemical Activity Barometer Increases in April</div>
						<div className="ts">43mn</div>
					</li>
					<li>
						<div className="i"><img src="https://www.google.com/s2/favicons?domain=www.calculatedriskblog.com" /></div>
						<div className="t">Calculated Risk</div>
						<div className="d">Chemical Activity Barometer Increases in April</div>
						<div className="ts">43mn</div>
					</li>
				</ul>
			</div>
		);
	}
}

export default News;