import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface IInput{
    name: string;
    password: string;
    email: string;
}
export interface IAuthInput {
    register:UseFormRegister<IInput>
    errors:FieldErrors<IInput>
}