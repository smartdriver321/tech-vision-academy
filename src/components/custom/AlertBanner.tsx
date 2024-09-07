import { Rocket, TriangleAlert } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AlertBannerProps {
	isCompleted: boolean
	requiredFieldsCount: number
	missingFieldsCount: number
}

export default function AlertBanner({
	isCompleted,
	requiredFieldsCount,
	missingFieldsCount,
}: AlertBannerProps) {
	return (
		<Alert
			className='my-4'
			variant={`${isCompleted ? 'complete' : 'destructive'}`}
		>
			{isCompleted ? (
				<Rocket className='h-4 w-4' />
			) : (
				<TriangleAlert className='h-4 w-4' />
			)}
			<AlertTitle className='text-xs font-medium'>
				{missingFieldsCount} missing field(s) / {requiredFieldsCount} required
				fields
			</AlertTitle>
			<AlertDescription className='text-xs'>
				{isCompleted
					? 'Great job! Ready to publish'
					: 'You can only publish when all the required fields are completed'}
			</AlertDescription>
		</Alert>
	)
}
