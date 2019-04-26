import React   from 'react';
import PouchDB from 'pouchdb';

export const DbContext = React.createContext({
	db_feeds:       new PouchDB('pager_feeds'),
	db_feeds_items: new PouchDB('pager_feeds_items')
});