import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

const useRedirectByUserCheck = (isAuthPage = false) => {
	const [shouldLoadContent, setShouldLoadContent] = useState(false)
	const router = useRouter()
	const shouldCheckAyrh = useRef(true)

	const checkUser = async () => {
      const user = await 
   }
}
