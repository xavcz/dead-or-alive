import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithTracker } from 'react-komposer';

import Revenues from '/imports/api/revenues/collections';

import { TreePage } from '/imports/ui/pages/TreePage.jsx';
import { Loading } from '/imports/ui/components/common/Loading.jsx';


function composerRevenues(props, onData) {
	if (Meteor.subscribe('revenues.all').ready()) {
		const revenues = Revenues.find({}, { sort: { createdAt: -1 } }).fetch();
		onData(null, { revenues });
	}
};

export const Tree = composeWithTracker(composerRevenues, Loading)(TreePage);