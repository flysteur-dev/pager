import React, { Component } from 'react';
import { DbContext } from './Helpers/Db';
import './App.scss';

//Components
import Feeds  from './Components/Feed/Feeds';
import List   from './Components/List/List';
import Viewer from './Components/Viewer/Viewer';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading:    true,
			viewer:     null,
			feeds:      [ ],
			feedsItems: [ ]
		}
	}

	async componentDidMount() {
		//Initialize persisted feeds items
		let persistedItems = await this.context.db_feeds_items.allDocs({ include_docs: true });
			persistedItems = persistedItems.rows.filter((item) => item.doc.unread === true);
			persistedItems = persistedItems.map(item => item.doc);

		//Initialize persisted feeds
		let persistedFeeds = await this.context.db_feeds.allDocs({ include_docs: true });
			persistedFeeds = persistedFeeds.rows.map(feed => {
				feed.doc.unread = persistedItems.filter((item) => item.feedId === feed.id);
				feed.doc.unread = feed.doc.unread.map(item => item._id);

				console.log(`Feed ${feed.id} has ${feed.doc.unread.length} unread.`);
				return feed.doc;
			});

		this.setState({
			loading:    false,
			feeds:      [...persistedFeeds],
			feedsItems: [...persistedItems]
		});
	}

	openViewer = (item) => {
		window.location.hash = "#viewer";
		this.setState({ viewer: item });
	}

	render() {
		return (
			<div className="App">
				<Feeds  feeds={this.state.feeds} />
				<List   items={this.state.feedsItems} openViewer={this.openViewer} />
				<Viewer viewer={this.state.viewer} />
			</div>
		);
	}
}

App.contextType = DbContext;
export default App;
