import { Header } from '@/components/Header'
import { Sarabun } from 'next/font/google'
import './globals.css'

const sarabun = Sarabun({
	weight: ['300', '400', '500', '600'],
	subsets: ['latin'],
})

export const metadata = {
	title: 'MoveApp',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={sarabun.className}>
				<Header />
				{children}
			</body>
		</html>
	)
}
