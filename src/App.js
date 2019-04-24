import React, { Component } from 'react';
import './App.scss';

//Components
import Feeds from './Components/Feeds';
import News from './Components/News';
import Viewer from './Components/Viewer';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading:    true,
			feeds:      [
				{ icon: "https://korben.info/app/themes/korben/dist/favicons/favicon-32x32.png", title: "Korben", uri: "https://korben.info/rss" },
			],
			feedsItems: [
				{ _id: 1, title: "Blabla", desc: "blabla 2", date: new Date()}
			]
		}
	}

	async componentDidMount() {

	}

	render() {
		return (
			<div className="App">
				<Feeds feeds={this.state.feeds} />
				<News />
				<Viewer />
			</div>
		);
	}
}

export default App;
