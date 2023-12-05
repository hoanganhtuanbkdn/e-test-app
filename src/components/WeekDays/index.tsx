'use client';
import React, { useState } from 'react';
import MoreIcon from '@/components/Icons/MoreIcon';
import AddIcon from '@/components/Icons/AddIcon';
import moment from 'moment/moment';
import { cn, getDayName } from '@/lib/utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function WeekDays({ initData }: {
	initData: {
		days: any[],
		weekDays: string[]
	}
}) {
	const [data, setData]: any = useState(initData);

	const {
		days,
		weekDays,
	} = data;


	const handleDrop = (result: any) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		const desWorkouts = destination.droppableId?.split('-');
		const sourWorkouts = source.droppableId?.split('-');

		// handle drag exercise
		if (
			desWorkouts?.[1] && desWorkouts?.[1] === sourWorkouts?.[1] && desWorkouts?.[0] === sourWorkouts?.[0]
		) {
			const key = desWorkouts?.[0];

			// find index
			const itemIndex = data.days[key].workouts?.findIndex((item: any) => item.id === destination?.droppableId);

			// find exercises
			const newColumn = [...data.days[key].workouts?.[itemIndex]?.exercises] || [];

			const newItem = newColumn?.find((item: any) => item.id === draggableId);

			newColumn.splice(source.index, 1);
			newColumn.splice(destination.index, 0, newItem);

			const newWorkouts = data.days[key].workouts;

			newWorkouts[itemIndex].exercises = newColumn;

			const newData = {
				...data,
				days: {
					...data.days,
					[key]: {
						...data.days[key],
						workouts: newWorkouts,
					},
				},
			};

			setData(newData);
			return;
		}

		// handle drag workout

		const newItem = data.days[source.droppableId].workouts?.find((item: any) => item.id === draggableId);
		const newSourceColumn = data.days[source.droppableId].workouts;
		const newDestinationColumn = data.days[destination.droppableId].workouts;

		newSourceColumn.splice(source.index, 1);
		newDestinationColumn.splice(destination.index, 0, newItem);

		const newData = {
			...data,
			days: {
				...data.days,
				[source.droppableId]: {
					...data.days[source.droppableId],
					workouts: newSourceColumn,
				},
				[destination.droppableId]: {
					...data.days[destination.droppableId],
					workouts: newDestinationColumn,
				},
			},
		};

		setData(newData);
	};


	return <DragDropContext onDragEnd={handleDrop}>
		{weekDays?.map((day: string, index: number) =>
			<WeekDay
				key={day}
				day={days[day as '03'] || {}}
				workouts={days[day as '03']?.workouts || []}
				index={index}
			/>)}
	</DragDropContext>;
}


const WeekDay = ({ day, workouts, index }: any) => {
	const currentDay = moment().format('DD');

	return (
		<div key={day.id}>
			<div className='w-[179px] min-h-full flex flex-col gap-2'>
				<div className=''>
					<p className='text-gray-1 text-[10px] font-semibold uppercase'>{getDayName(index)}</p>
				</div>
				<div className='bg-gray flex flex-1 flex-col gap-[5px] p-[10px] rounded-md'>
					<div className=''>
						<p className={cn(' font-semibold text-[11px]', day.id === currentDay ? 'text-purple' : 'text-gray-2')}>{day.id}</p>
					</div>
					<Droppable droppableId={day.id} type='column'>
						{(provided) => (<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={cn(workouts?.length ? 'space-y-1' : 'flex flex-1')}
						>
							{
								workouts.map((workout: any, index2: any) => (
									<div key={workout.id}
										 className=' space-y-1 border shadow-card border-card p-[7px] bg-white rounded-md'
									>
										<Draggable key={workout.id} draggableId={workout.id} index={index2}>
											{(provided, snapshot) => (<div
												ref={provided.innerRef}
												{...provided.dragHandleProps}
												{...provided.draggableProps}
												className={cn(snapshot.isDragging && 'space-y-1 border shadow-card border-card p-[7px] bg-white rounded-md')}
											>
												<div className='flex flex-row justify-between items-center'>
													<p className='line-clamp-1 text-purple text-[10px] font-bold uppercase'>{workout.label}</p>
													<MoreIcon />
												</div>
												{
													snapshot.isDragging && <>
														<Items2 workout={workout}  />
														<div className='flex justify-end'>
															<button>
																<AddIcon />
															</button>
														</div>
													</>
												}
											</div>)}
										</Draggable>
										<Items workout={workout} />

										<div className='flex justify-end'>
											<button>
												<AddIcon />
											</button>
										</div>
									</div>
								))
							}
						</div>)}
					</Droppable>
				</div>
			</div>
		</div>
	);
};

const Items = ({ workout }: { workout: any }) => {
	return <Droppable droppableId={workout.id} type='item'>
		{(provided) => (<div
			{...provided.droppableProps}
			ref={provided.innerRef}
		>
			{
				workout.exercises.map((exercise: any, index: number) => (
					<Draggable key={exercise.id} draggableId={exercise.id} index={index}>
						{(provided) => (<div
								ref={provided.innerRef}
								{...provided.dragHandleProps}
								{...provided.draggableProps}
								className='border shadow-card border-card bg-card-2 rounded-md px-2 py-[5px] space-y-[2px] mt-2'
								key={exercise.id}
							>
								<div>
									<p className='line-clamp-1 font-semibold text-black text-[13px] text-right'>
										{exercise.content}
									</p>
								</div>
								<div
									className='flex flex-row text-[10px] gap-4 justify-between items-center'>
									<p className='font-bold text-gray-3'>3x</p>
									<p className='line-clamp-1 text-gray-4'>
										50 lb x 5, 60 lb x 5, 70 lb x 5
									</p>
								</div>
							</div>
						)}
					</Draggable>
				))
			}
		</div>)}
	</Droppable>;
};


const Items2 = ({ workout }: { workout: any }) => {
	return workout.exercises.map((exercise: any, index: number) => (
						<div
								className='border shadow-card border-card bg-card-2 rounded-md px-2 py-[5px] space-y-[2px] mt-2'
								key={exercise.id}
							>
								<div>
									<p className='line-clamp-1 font-semibold text-black text-[13px] text-right'>
										{exercise.content}
									</p>
								</div>
								<div
									className='flex flex-row text-[10px] gap-4 justify-between items-center'>
									<p className='font-bold text-gray-3'>3x</p>
									<p className='line-clamp-1 text-gray-4'>
										50 lb x 5, 60 lb x 5, 70 lb x 5
									</p>
								</div>
							</div>
						)
				)
};
export default WeekDays;
