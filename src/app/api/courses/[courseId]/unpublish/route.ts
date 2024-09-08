import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { db } from '@/lib/db'

export const POST = async (
	req: NextRequest,
	{ params }: { params: { courseId: string } }
) => {
	try {
		const { userId } = auth()
		const { courseId } = params

		if (!userId) {
			return new Response('Unauthorized', { status: 401 })
		}

		const course = await db.course.findUnique({
			where: { id: courseId, instructorId: userId },
		})

		if (!course) {
			return new Response('Course not found', { status: 404 })
		}

		const unpusblishedCourse = await db.course.update({
			where: { id: courseId, instructorId: userId },
			data: { isPublished: false },
		})

		return NextResponse.json(unpusblishedCourse, { status: 200 })
	} catch (err) {
		console.log('[courseId_unpublish_POST]', err)
		return new Response('Internal Server Error', { status: 500 })
	}
}
