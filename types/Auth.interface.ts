import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface IInput{
    username: string;
    password: string;
    email: string;
}
export interface IAuthInput {
    register:UseFormRegister<IInput>
    errors:FieldErrors<IInput>
}
export interface ISignUpFx{
    url: string;
    username:string;
    password:string;
    email:string;
}