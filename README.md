<p align="center">
	<a href="https://flysteur-dev.github.io/pager/" rel="noopener" target="_blank">
		<img width="150" src="https://raw.githubusercontent.com/flysteur-dev/pager/master/public/favicon.png" alt="Pager logo">
	</a>
</p>

<h1 align="center">Pager</h1>

## Demo

[Try it](https://pager.run) with your mobile phone or desktop browser.<br>
Want to keep it? Add it to your dashboard!

Note: This demo is using [cors-anywhere](https://github.com/Rob--W/cors-anywhere) and may not be working or subject to usage restriction.<br>
Prefer using the docker image, who is using a built in nginx reverse proxy to get around of CORS restriction, see instruction below.

## Screenshots

<p align="center">
	<img src="https://raw.githubusercontent.com/flysteur-dev/pager/master/public/4.png" width="250px" alt="splashscreen">
	<img src="https://raw.githubusercontent.com/flysteur-dev/pager/master/public/2.png" width="250px" alt="news">
	<img src="https://raw.githubusercontent.com/flysteur-dev/pager/master/public/3.png" width="250px" alt="feed list">
	<img src="https://raw.githubusercontent.com/flysteur-dev/pager/master/public/1.png" width="900px" alt="desktop">
</p>

## Why ?

"Read and Run Everywhere.."<br><br>

Pager wants to be a very very minimalist rss reader.<br>
It will ever only use web technologies and will stay as much as possible serverless** with business logic in the client side.<br>
Optionnally (later) it will offer syncing option to share feeds between instances (desktop, mobile, etc..)<br><br>

Pager doesn't have many dependencies and aims to keep code understandable.<br><br>

Main dependencies (thanks to) :<br>
- [rss-parser](https://github.com/bobby-brennan/rss-parser) : A small library for turning RSS XML feeds into JS objects.
- [pouchdb](https://github.com/pouchdb/pouchdb) : JS database to work offline and inspired by [CouchDB](http://couchdb.apache.org/)

** The Web App requires at least a reverse proxy to get around CORS restriction to fetch feed over another domain.

## Roadmap

- [x] Offline
- [x] Feed subscription
- [x] Web App
- [x] Read article in viewer
- [x] Media sharing (require chrome 74 or fallback to clipboard)
- [x] Adding article to favorite
- [x] Multi view option (compact, large)
- [x] Dark mode
- [ ] Keyboard shortcuts
- [ ] Web worker to refresh feeds in background
- [ ] Syncing using couchDB
- [ ] Desktop app using electron

## Try it

```sh
// WITH DOCKER
//
git clone git@github.com:flysteur-dev/pager.git

// Install
cd pager
npm install

// Build the docker container
npm run build
docker build --tag=pager .

// Run
docker run -p 3000:80 pager
open http://localhost:3000
```

```sh
// WITHOUT DOCKER
//
git clone git@github.com:flysteur-dev/pager.git

// Install
cd pager
npm install

// Update constants
edit PROXY_PATH in /src/Helpers/Constants.js to "https://cors-anywhere.herokuapp.com/"

// Run
npm start
open http://localhost:3000
```

## Changelog
[0.1.0] - 2019-05-01
- Initial release

## Contributing

If you find this project useful, we'd appreciate any contribution!<br>
You can also check [project page](https://github.com/flysteur-dev/pager/projects/1) to find something to start.

