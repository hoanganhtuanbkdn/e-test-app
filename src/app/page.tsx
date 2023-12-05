import moment from 'moment';
import WeekDays from '@/components/WeekDays';
import { getWorkout } from '@/app/api';


export default async function Home() {
	const { data } = await getWorkout();

	return (
		<main className='bg-white w-scren px-[64px] pt-[83px] relative'>
			<div className='flex flex-row min-h-[calc(100vh-_-83px)] overflow-x-scroll gap-1'>
				<WeekDays initData={data} />
			</div>
		</main>
	);
}
