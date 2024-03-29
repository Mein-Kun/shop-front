import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IInputs {
  name: string
  email: string
  password: string
}

export interface IAuthPageInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
}

export interface ISignUpFx {
  url: string
  username: string
  password: string
  email: string
}

export interface ISignInFx {
  url: string
  username: string
  password: string
}

export interface IAuthFx {
  url: string
  accessToken: string | null
}

export interface IUser {
  userId: number
  username: string
  email: string
}
