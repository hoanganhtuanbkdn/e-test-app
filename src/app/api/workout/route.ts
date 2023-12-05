import { NextRequest } from 'next/server';
import moment from 'moment/moment';

const getWeekDays = () => {
	const today = moment();

	const startOfWeek = today.clone().startOf('week');

	const weekDays = Array.from({ length: 7 }, (v, i) => startOfWeek.clone().add(i, 'days').format('DD'));
	const days: any = {}
	weekDays.forEach(function(day, index) {
		days[day] = {
			id: day,
			workouts: [1, 2].map(parent => ({
				id: `${day}-${parent}-workout`,
				label: `${day}-${parent} - Chest day - with arm exercises'`,
				exercises: [1,2,3].map(item => ({
					id: `${day}-workout-${parent}-${item}-exercises`,
					content: `${day}-${parent}-${item} - Press Bench Press Medium Grip`,
				}))
			})),
		};
	});
	return {
		days,
		weekDays
	};
}

export async function GET(request: NextRequest) {
	const data = getWeekDays();

	return Response.json({ data });
}

