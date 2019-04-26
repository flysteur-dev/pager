import React, { Component } from 'react';
import { DbContext } from './Helpers/Db';
import './App.scss';

//Components
import Feeds  from './Components/Feeds';
import List   from './Components/List';
import Viewer from './Components/Viewer';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading:    true,
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

	render() {
		return (
			<div className="App">
				<Feeds feeds={this.state.feeds} />
				<List  items={this.state.feedsItems} />
				<Viewer />
			</div>
		);
	}
}

App.contextType = DbContext;
export default App;
