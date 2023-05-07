import React from 'react'
import styles from '@/styles/Auth/index.module.scss'
import NameInput from '@/components/elements/Auth/NameInput'
import PasswordInput from '@/components/elements/Auth/PasswordInput'
import EmailInput from '@/components/elements/Auth/EmailInput'
import{useForm} from 'react-hook-form'
import { IInput } from '@/types/Auth.interface'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
	const {register,formState:{errors},handleSubmit} = useForm<IInput>()

    const onSubmit = (data:IInput)=>{
		console.log(data)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={`${styles.title} $${styles.form_title}`}>
				создать аккаунт
			</h2>
			<NameInput register={register} errors={errors}/>
			<PasswordInput register={register} errors={errors}/>
			<EmailInput register={register} errors={errors}/>

			<button
				className={`${styles.button} ${styles.submit} ${styles.form__button}`}
			>
				SIGN UP
			</button>
		</form>
	)
}

export default SignUpForm
