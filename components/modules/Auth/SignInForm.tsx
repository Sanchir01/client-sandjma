import NameInput from '@/components/elements/Auth/NameInput'

import PasswordInput from '@/components/elements/Auth/PasswordInput'
import { AllAuth } from '@/service/Users.service'
import styles from '@/styles/Auth/index.module.scss'
import { IInput, SignIn } from '@/types/Auth.interface'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

import { singInFx } from '@/effector/auth'
import spinnerStyles from '@/styles/Spinner/index.module.scss'
import { useRouter } from 'next/router'

const SignInForm = () => {
	const [spinner, setSpinner] = React.useState(false)
	const {
		register,
		formState: { errors },
		handleSubmit,
		resetField
	} = useForm<IInput>()

	const route = useRouter()

	const mutation = useMutation((data: SignIn) => AllAuth.SignIn(data), {
		onError: () => {
			alert('неправильный пароль или никнейм')
		},
		onSuccess: () => {
			route.push('/')
		}
	})

	const onSubmit = async (data: IInput) => {
		try {
			await singInFx({
				url: `/users/login`,
				username: data.username,
				password: data.password
			})
			route.push('/')
			resetField('username')
			resetField('password')
		} catch (error) {
			return null
		} finally {
			setSpinner(false)
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={`${styles.title} ${styles.form_title}`}>
				Войти в аккаунт
			</h2>

			<NameInput register={register} errors={errors} />
			<PasswordInput register={register} errors={errors} />
			<button
				className={`${styles.button} ${styles.submit} ${styles.form__button}`}
			>
				{spinner ? <div className={spinnerStyles.spinner}></div> : 'SIGN IN'}
			</button>
		</form>
	)
}

export default SignInForm
