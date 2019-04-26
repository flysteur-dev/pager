import React   from 'react';
import PouchDB from 'pouchdb';

export const DbContext = React.createContext({
	db: new PouchDB('pager')
});