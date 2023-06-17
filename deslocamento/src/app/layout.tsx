import { Header } from '@/components/Header'
import './globals.css'
import { Sarabun } from 'next/font/google'
import { SelectButtons } from '@/components/SelectButtons'

const sarabun = Sarabun({
	weight: ['300', '400', '500', '600'],
	subsets: ['latin'],
})

export const metadata = {
	title: 'Deslocamento App',
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
				<SelectButtons />
				{children}
			</body>
		</html>
	)
}
