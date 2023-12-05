
export const isDev = process.env.NODE_ENV === 'development';

export const API_URL = isDev
	? 'http://localhost:3000'
	: '';

export const APIS = {
	GET_WORKOUT: API_URL + '/api/workout',
}
export async function getWorkout() {
	try {
		const res = await fetch(APIS.GET_WORKOUT, {
			cache: 'no-store'
		});

		if (!res.ok) {
			return {
				data: [],
			};
		}

		return res.json();

	} catch (e) {
		return {
			data: [],
		};
	}
}
