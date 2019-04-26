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
			feeds:      [
				{ title: "Korben",      icon: "https://korben.info/app/themes/korben/dist/favicons/favicon-32x32.png", uri: "https://korben.info/rss" },
				{ title: "Next INpact", icon: "https://www.nextinpact.com/Images/favicon.ico", uri: "https://www.nextinpact.com/rss/news.xml" },
			],
			feedsItems: [ ]
		}
	}

	async componentDidMount() {
		//Initialize persisted items
		let persistedItems = await this.context.db.allDocs({ include_docs: true });
			persistedItems = persistedItems.rows.filter((item) => item.doc.unread === true);
			persistedItems = persistedItems.map(item => item.doc);

		this.setState({ loading: false, feedsItems: [...persistedItems] });
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
