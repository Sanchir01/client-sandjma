/* eslint-disable react-hooks/exhaustive-deps */

import { checkUserAuthFx } from '@/effector/auth'
import { setUser } from '@/effector/user'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const useRedirectByUserCheck = (isAuthPage = false) => {
	const [shouldLoadContent, setShouldLoadContent] = useState(false)
	const router = useRouter()
	const shouldCheckAuth = useRef(true)

	useEffect(() => {
		if (shouldCheckAuth.current) {
			shouldCheckAuth.current = false
			checkUser()
		}
	}, [])

	const checkUser = async () => {
		const user = await checkUserAuthFx('/users/login-check')

		if (isAuthPage) {
			if (!user) {
				setShouldLoadContent(true)
				return
			}

			router.push('/')
			return
		}

		if (user) {
			setUser(user)
			setShouldLoadContent(true)
			return
		}

		router.push('/auth')
	}

	return { shouldLoadContent }
}

export default useRedirectByUserCheck
