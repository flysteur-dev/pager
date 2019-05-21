describe("Onboarding", () => {

	before(function () {
		//Delete pager db
		indexedDB.deleteDatabase("_pouch_pager_feeds");
		indexedDB.deleteDatabase("_pouch_pager_feeds_items");
	});

	it("Should show onboarding message", () => {
		cy.visit("/");
		cy.get('.App-Alert').should('be.visible');

		//Title
		cy.get('.App-Alert-Title').should('contain', 'Seems like you are new here ?');
		//Button
		cy.get('.App-Alert-Actions > button').should('be.visible');
		cy.get('.App-Alert-Actions > button').should('contain', 'OK');
	});

	it("Should add the default rss provider", () => {
		cy.visit('/', {
			//TODO: Workaround to fallback to XHR, Cypress doesn't support fetch actually.
			onBeforeLoad(win) { win.fetch = null; }
		});

		//Stub
		cy.server();
		cy.route({
			method:     'GET',
			url: 		'**/proxy?url=https://**',
			response: 	'fixture:feed_rss.xml',
			headers:    { 'content-type': 'text/xml' }
		}).as("feed");

		//Click OK
		cy.get('.App-Alert-Actions > button').click();
		cy.wait('@feed');

		//Should add fixture in the feed list
		cy.get('.App-Feeds ul > li').should('have.length', 1);
		cy.get('.App-Feeds ul > li').should(($li) => {
			expect($li).to.have.length(1);

			//Check feed properties and counting unread item
			let feed = $li.first();
			expect(feed.find('.n')).to.contain('1');
			expect(feed.find('.t')).to.contain('Title');
		});

		//Should add {1} unread item in List
		cy.get('.App-List ul > a').should(($a) => {
			expect($a).to.have.length(1);

			//Check item properties and unread attribute
			let item = $a.first();
			expect(item).to.have.attr('href', 'https://link');

			let content = item.find('li').first();
			expect(content).to.have.attr('class', 'unread');
			expect(content.find('.t')).to.contain('item > title');
			expect(content.find('.d')).to.contain('item > description...');
		});
	});
});