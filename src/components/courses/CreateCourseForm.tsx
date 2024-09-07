'use client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { ComboBox } from '@/components/custom/ComboBox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Title is required and minimum 2 characters',
	}),
	categoryId: z.string().min(1, {
		message: 'Category is required',
	}),
	subCategoryId: z.string().min(1, {
		message: 'Subcategory is required',
	}),
})

interface CreateCourseFormProps {
	categories: {
		label: string // name of category
		value: string // categoryId
		subCategories: { label: string; value: string }[]
	}[]
}

export default function CreateCourseForm({
	categories,
}: CreateCourseFormProps) {
	const router = useRouter()

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			categoryId: '',
			subCategoryId: '',
		},
	})

	const { isValid, isSubmitting } = form.formState

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post('/api/courses', values)
			router.push(`/instructor/courses/${response.data.id}/basic`)
			toast.success('New Course Created')
		} catch (err) {
			console.log('Failed to create new course', err)
			toast.error('Something went wrong!')
		}
	}

	return (
		<div className='p-10'>
			<h1 className='text-xl font-bold'>
				Let give some basics for your course
			</h1>
			<p className='text-sm mt-3'>
				It is ok if you cannot think of a good title or correct category now.
				You can change them later.
			</p>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 mt-10'
				>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder='Ex: Web Development for Beginners'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='categoryId'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<ComboBox options={categories} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='subCategoryId'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Subcategory</FormLabel>
								<FormControl>
									<ComboBox
										options={
											categories.find(
												(category) =>
													category.value === form.watch('categoryId')
											)?.subCategories || []
										}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' disabled={!isValid || isSubmitting}>
						{isSubmitting ? (
							<Loader2 className='h-4 w-4 animate-spin' />
						) : (
							'Create'
						)}
					</Button>
				</form>
			</Form>
		</div>
	)
}
