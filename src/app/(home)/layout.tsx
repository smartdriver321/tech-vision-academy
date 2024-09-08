import Topbar from '@/components/layout/Topbar'

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
