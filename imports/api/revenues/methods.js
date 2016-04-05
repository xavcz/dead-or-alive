import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';

import Revenues from './collections';

import { getLocalLifeStatus } from './getLifeStatus';

export const addWeeklyRevenue = new ValidatedMethod({
	name: 'Revenues.methods.addWeeklyRevenue',
	validate: Revenues.Schema.validator(),
	run({ revenue, accomplishment, problem, createdAt }) {
		if (Meteor.isServer) {
			const { userId } = this;

			const latestRevenue = Revenues.find({ userId }).count() > 0
				? Revenues.findOne({ userId, createdAt: { $lte: new Date() } }, { sort: { createdAt: -1 } })
				: { revenue: 0 };

			const status = getLocalLifeStatus(revenue, latestRevenue.revenue);

			return Revenues.insert({ revenue, accomplishment, problem, createdAt, status, userId });
		}
	},
});

export const reset = new ValidatedMethod({
	name: 'Revenues.methods.reset',
	validate(args) { check(args, {}) },
	run({}) {
		if (Meteor.isServer) {
			const { userId } = this;

			return Revenues.remove({ userId });
		}
	},
});