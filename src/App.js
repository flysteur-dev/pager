import React, { Component } from 'react';
import './App.scss';

//Components
import Feeds from './Components/Feeds';
import List from './Components/List';
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
				{ _id: 1, unread: true, icon: "https://korben.info/app/themes/korben/dist/favicons/favicon-32x32.png", title: "Les liens de la semaine #16", desc: "Coucou ! Vous l'attendiez avec impatience alors la voici, la voilà, ma sélection de liens de la semaine !...", date: new Date()},
				{ _id: 2, unread: false, icon: "https://korben.info/app/themes/korben/dist/favicons/favicon-32x32.png", title: "X-Men Dark Phoenix", desc: "J'en peux plus des Avengers et ça je vous l'ai déjà dit...", date: new Date()}
			]
		}
	}

	async componentDidMount() {
		//TODO: fetch feeds db
	}

	render() {
		return (
			<div className="App">
				<Feeds feeds={this.state.feeds} />
				<List list={this.state.feedsItems} />
				<Viewer />
			</div>
		);
	}
}

export default App;
