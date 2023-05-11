import React from 'react'
import styles from '@/styles/Auth/index.module.scss'
import NameInput from '@/components/elements/Auth/NameInput'
import PasswordInput from '@/components/elements/Auth/PasswordInput'
import EmailInput from '@/components/elements/Auth/EmailInput'
import { useForm } from 'react-hook-form'
import { IInput } from '@/types/Auth.interface'
import { useMutation } from '@tanstack/react-query'
import { AllAuth } from '@/service/Users.service'
import spinnerStyles from '@/styles/Spinner/index.module.scss'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
	const [spinner, setSpinner] = React.useState(false)
	const {
		register,
		formState: { errors },
		handleSubmit,
		resetField
	} = useForm<IInput>()

	const mutation = useMutation((data: IInput) => AllAuth.CreateUser(data), {
		onSuccess:() =>{
			alert('удачная регтсьрация')
		},
		onError: () => {
			alert('Такой Email или Nickname уже есть')
		}
	})

	const onSubmit = async (data: IInput) => {
		try {
			setSpinner(true)
			mutation.mutate(data)
			if (mutation.isError) {
				return null
			}
			resetField('username')
			resetField('password')
			resetField('email')
			switchForm()
		} catch (error) {
			return null
		} finally {
			setSpinner(false)
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={`${styles.title} ${styles.form_title}`}>
				создать аккаунт
			</h2>
			<NameInput register={register} errors={errors} />
			<PasswordInput register={register} errors={errors} />
			<EmailInput register={register} errors={errors} />

			<button
				className={`${styles.button} ${styles.submit} ${styles.form__button}`}
			>
				{spinner ? <div className={spinnerStyles.spinner}></div> : 'SIGN UP'}
			</button>
		</form>
	)
}

export default SignUpForm
