import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { withHydrate } from 'effector-next'
import type { AppProps } from 'next/app'
import NEXTNProgress from 'nextjs-progressbar'
import React, { useEffect, useState } from 'react'
const enhance = withHydrate()
function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		mounted && (
			<>
				<NEXTNProgress />
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
				</QueryClientProvider>
			</>
		)
	)
}

export default enhance(App as React.FC<AppProps>)
