import React, { Component } from 'react';
import moment from 'moment';
import { DbContext } from '../Helpers/Db';
import {
	CloseIcon,
	OpenInNewIcon,
	ShareIcon,
	StarFullIcon,
	StarIcon,
} from './Icon';

class Viewer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			_id:      null,
			_rev:     null,
			icon:     null,
			title:    null,
			date:     null,
			content:  null,
			link:     null,
			favorite: false,
			active:   false
		}
	}

	componentDidMount() {
		window.addEventListener("popstate", this.handleBackButton);
	}

	componentWillUnmount() {
		window.removeEventListener("popstate", this.handleBackButton);
	}

	componentWillReceiveProps(nextProps) {
		let viewer = nextProps.viewer;
		if (viewer) {
			this.setState({
				_id:      viewer._id,
				_rev:     viewer._rev,
				icon:     viewer.icon,
				title:    viewer.title,
				date:     viewer.date,
				content:  viewer.content,
				link:     viewer.link,
				favorite: viewer.favorite || false,
				active:   true
			});
		}
	}

	handleBackButton = () => {
		//Handle back button then close viewer
		if (this.state.active) {
			this.close();
		}
	}

	close = () => {
		//Close and unreference content
		//Activity inside the embedded viewer will be destroy ex: youtube player..
		this.setState({ active: false, content: null });
		window.history.replaceState(null, null, ' ');
	}

	favorite = async () => {
		try {
			//Toggle favorite
			var item = await this.context.db_feeds_items.get(this.state._id);
			item.favorite = !this.state.favorite;

			await this.context.db_feeds_items.put(item);
			this.setState({ favorite: item.favorite });
		} catch (e) {
			console.warn(`Unable to toggle favorite item: ${this.state._id} reason: ${e}`);
		}
	}

	share = () => {
		if (navigator && navigator.share) {
			navigator.share({
				title: this.state.title,
				text:  this.state.title,
				url:   this.state.link,
			});
		} else {
			//Fallback
			//If web share is not available
			//Copy link to clipboard
			const el = document.createElement('textarea');
			el.value = this.state.link;
			el.style.position = 'absolute';
			el.style.left = '-9999px';
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			alert("Copied to clipboard!");
		}
	}

	render() {
		return (
			<div className={this.state.active ? 'App-Viewer active' : 'App-Viewer'}>
				<div className="App-Viewer-Options">
					<button className="App-Viewer-Options-Close" onClick={this.close}><CloseIcon /></button>
					<a
						rel="noopener noreferrer"
						target="_blank"
						href={this.state.link}
						onClick={this.close}>
					<button title="Open to new tab"><OpenInNewIcon /></button></a>
					<button title="Share link" onClick={this.share}><ShareIcon /></button>
					<button title="Add to favorite" onClick={this.favorite}>
						{this.state.favorite ? <StarFullIcon /> : <StarIcon /> }
					</button>
				</div>

				<div className="App-Viewer-Title">
					<h1><img alt="icon" src={this.state.icon} /> {this.state.title}</h1>
					<p>{moment.unix(this.state.date).format("LLLL")}</p>
				</div>

				{ /* TODO: find safer way.. */}
				<div className="App-Viewer-Content" dangerouslySetInnerHTML={{ __html: this.state.content }} />
			</div>
		)
	}
}

Viewer.contextType = DbContext;
export default Viewer;