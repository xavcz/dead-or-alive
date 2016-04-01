import React from 'react';

import { mapRevenuesToLifeStatus } from '../../lib/actions/getLifeStatus';

import LifeStatus from './LifeStatus.jsx';
import UpdateStatus from './UpdateStatus.jsx';
import StartingPoint from './StartingPoint.jsx';

export default Timeline = ({ revenues }) => {

	const lifeStatus = mapRevenuesToLifeStatus(revenues);

	return (
		<div>
			<header>
				<h1>Is your startup Dead or Alive ?</h1>
				<h3>In other words, are you currently creating value?</h3>
				<LifeStatus { ...lifeStatus } />
			</header>
			<section id="cd-timeline" className="cd-container">
				<UpdateStatus />
				{ revenues.map(doc => <WeekCard key={ doc._id } { ...doc } />) }
				<StartingPoint />
			</section>
		</div>
	);
};