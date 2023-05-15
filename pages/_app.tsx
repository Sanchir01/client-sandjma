import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import NEXTNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient()
	queryClient.invalidateQueries({ queryKey: ['logicCheck'] })
	return (
		<>
			<NEXTNProgress/>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	)
}
