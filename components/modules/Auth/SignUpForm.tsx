import React from 'react'
import styles from '@/styles/Auth/index.module.scss'
import NameInput from '@/components/elements/Auth/NameInput'
import PasswordInput from '@/components/elements/Auth/PasswordInput'
import EmailInput from '@/components/elements/Auth/EmailInput'
import{useForm} from 'react-hook-form'
import { IInput, ISignUpFx } from '@/types/Auth.interface'
import { useMutation } from '@tanstack/react-query'
import { AllAuth } from '@/service/Users.service'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
	const {register,formState:{errors},handleSubmit,resetField} = useForm<IInput>()

	const mutation = useMutation((data:IInput) => AllAuth.CreateUser(data),)

    const onSubmit = async (data:IInput)=>{
		
		mutation.mutate(data)
		resetField('username')
		resetField('password')
		resetField('email')
		switchForm()
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
