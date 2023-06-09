import Layout from '@/components/layout/Layout'
import BGImage from '@/components/modules/DashboardPage/BGImage'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'

function Home() {
	const { shouldLoadContent } = useRedirectByUserCheck(true)
	return (
		<>
			<Head>
				<title>Sandjma  {shouldLoadContent ? '' : '| Главная'}</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link
					rel='icon'
					type='image/svg'
					sizes='32x32'
					href='../public/img/logo.svg'
				/>
			</Head>
			<Layout>
				<main></main>
				<BGImage />
				<DashboardPage />
			</Layout>
		</>
	)
}

export default Home
