import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { db } from '@/lib/db'
import { DataTable } from '@/components/custom/DataTable'
import { Button } from '@/components/ui/button'
import { columns } from '@/components/courses/Columns'

export default async function CoursesPage() {
	const { userId } = auth()

	if (!userId) {
		return redirect('/sign-in')
	}

	const courses = await db.course.findMany({
		where: {
			instructorId: userId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return (
		<div className='px-6 py-4'>
			<Link href='/instructor/create-course'>
				<Button>Create New Course</Button>
			</Link>

			<div className='mt-5'>
				<DataTable columns={columns} data={courses} />
			</div>
		</div>
	)
}
