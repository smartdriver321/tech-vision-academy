import Link from 'next/link'
import { Course, Section } from '@prisma/client'

import { db } from '@/lib/db'
import { Progress } from '../ui/progress'

interface CourseSideBarProps {
	course: Course & { sections: Section[] }
	studentId: string
}

export default async function CourseSideBar({
	course,
	studentId,
}: CourseSideBarProps) {
	const publishedSections = await db.section.findMany({
		where: {
			courseId: course.id,
			isPublished: true,
		},
		orderBy: {
			position: 'asc',
		},
	})

	const publishedSectionIds = publishedSections.map((section) => section.id)

	const completedSections = await db.progress.count({
		where: {
			studentId,
			sectionId: {
				in: publishedSectionIds,
			},
			isCompleted: true,
		},
	})

	const progressPercentage =
		(completedSections / publishedSectionIds.length) * 100

	return (
		<div className='hidden md:flex flex-col w-64 border-r shadow-md px-3 my-4 text-sm font-medium'>
			<h1 className='text-lg font-bold text-center mb-4'>{course.title}</h1>

			<Link
				href={`/courses/${course.id}/overview`}
				className={`p-3 rounded-lg hover:bg-[#FFF8EB] mt-4`}
			>
				Overview
			</Link>
			{publishedSections.map((section) => (
				<Link
					key={section.id}
					href={`/courses/${course.id}/sections/${section.id}`}
					className='p-3 rounded-lg hover:bg-[#FFF8EB] mt-4'
				>
					{section.title}
				</Link>
			))}
		</div>
	)
}
