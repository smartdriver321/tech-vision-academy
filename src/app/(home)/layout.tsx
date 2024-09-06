import Topbar from '@/components/ui/layout/Topbar'

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Topbar />
			{children}
		</>
	)
}
