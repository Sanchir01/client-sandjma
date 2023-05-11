import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IInput {
	username: string
	password: string
	email: string
}
export type SignIn = Omit<IInput, 'email'>

export interface IAuthInput {
	register: UseFormRegister<IInput>
	errors: FieldErrors<IInput>
}
export interface IAuthSignInd {
	register: UseFormRegister<SignIn>
	errors: FieldErrors<SignIn>
}
