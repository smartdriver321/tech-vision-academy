import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { db } from '@/lib/db'
import CourseCard from '@/components/courses/CourseCard'

export default async function LearningPage() {
	const { userId } = auth()

	if (!userId) {
		return redirect('/sign-in')
	}

	const purchasedCourses = await db.purchase.findMany({
		where: {
			customerId: userId,
		},
		select: {
			course: {
				include: {
					category: true,
					subCategory: true,
					sections: {
						where: {
							isPublished: true,
						},
					},
				},
			},
		},
	})

	return (
		<div className='px-4 py-6 md:mt-5 md:px-10 xl:px-16'>
			<h1 className='text-2xl font-bold'>Your courses</h1>
			<div className='flex flex-wrap gap-7 mt-7'>
				{purchasedCourses.map((purchase) => (
					<CourseCard key={purchase.course.id} course={purchase.course} />
				))}
			</div>
		</div>
	)
}
