import { db } from '@/lib/db'
import getCoursesByCategory from '../actions/getCourses'
import CourseCard from '@/components/courses/CourseCard'

export default async function HomePage() {
	const categories = await db.category.findMany({
		orderBy: {
			name: 'asc',
		},
		include: {
			subCategories: {
				orderBy: {
					name: 'asc',
				},
			},
		},
	})
	const courses = await getCoursesByCategory(null)

	return (
		<div className='md:mt-5 md:px-10 xl:px-16 pb-16'>
			<div className='flex flex-wrap gap-7 justify-center'>
				{courses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>
		</div>
	)
}
