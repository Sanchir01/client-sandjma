import { ILayoutProps } from '@/types/Common.interface'
import { FC } from 'react'
import Footer from '../modules/Footer/Footer'
import Header from '../modules/Header/Header'

const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default Layout
