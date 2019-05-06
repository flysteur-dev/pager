import React, { Component } from 'react';
import moment from 'moment';

class Viewer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			_id:     null,
			_rev:    null,
			icon:    null,
			title:   null,
			date:    null,
			content: null,
			link:    null,
			active:  false
		}
	}

	componentWillReceiveProps(nextProps) {
		let viewer = nextProps.viewer;
		if (viewer) {
			this.setState({
				_id:     viewer._id,
				_rev:    viewer._rev,
				icon:    viewer.icon,
				title:   viewer.title,
				date:    viewer.date,
				content: viewer.content,
				link:    viewer.link,
				active:  true
			});
		}
	}

	close = () => {
		//Close and unreference content
		//Activity inside the embedded viewer will be destroy ex: youtube player..
		this.setState({ active: false, content: null });
	}

	favorite = () => {
		alert("Favorite not implemented.");
		return false;
	}

	share = () => {
		alert("Sharing not implemented.");
		return false;
	}

	render() {
		return (
			<div className={this.state.active ? 'App-Viewer active' : 'App-Viewer'}>
				<div className="App-Viewer-Options">
					<button className="App-Viewer-Options-Close" onClick={this.close}>X</button>
					<a target="_blank" href={this.state.link}><button>OPEN</button></a>
					<button onClick={this.favorite}>&#9733;</button>
					<button onClick={this.share}>SHARE</button>
				</div>
				<div className="App-Viewer-Title">
					<h1><img src={this.state.icon} /> {this.state.title}</h1>
					<p>{moment.unix(this.state.date).format("LLLL")}</p>
				</div>

				{ /* TODO: find safer way.. */}
				<div className="App-Viewer-Content" dangerouslySetInnerHTML={{ __html: this.state.content }} />
			</div>
		)
	}

}

export default Viewer;