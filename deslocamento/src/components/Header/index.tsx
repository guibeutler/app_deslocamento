'use client'
import { Ubuntu } from 'next/font/google'

import './style.css'
import Sidebar from '@components/SideMenu'

const unbuto = Ubuntu({
	weight: ['400'],
	subsets: ['latin'],
})

interface HeaderProps {}

export function Header(props: HeaderProps) {
	return (
		<header style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr' }}>
			<div style={{ gridColumn: '1 / 2' }}>
				<Sidebar />
			</div>
			<div style={{ gridColumn: '2 / 3', justifySelf: 'center' }}>
				<a className={unbuto.className}>MoveApp</a>
			</div>
			<div style={{ gridColumn: '3 / 4' }}></div>
		</header>
	)
}
