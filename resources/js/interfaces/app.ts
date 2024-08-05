import { ChangeEvent } from "react"

export interface User {
  created_at: string
  email: string
  email_verified_at: string
  id: number
  name: string
  updated_at: string
}

export interface Message {
  created_at: string
  id: number
  room_id: number
  updated_at: string
  message: string
  user_id: number
  user: User
}

export interface Room {
  created_at: string
  id: number
  name: string
  is_direct_message: boolean
  pivot?: {
    user_id: number
    room_id: number
  }
  messages?: Message[]
  updated_at: string
  notifications?: number
}

export interface Auth {
  user: User
}

export interface ErrorProps {
  [key: string]: string | undefined
}

export interface DashboardProps {
  users: User[]
  auth: Auth
  rooms: Room[]
  room?: Room
  messages: Message[]
}

export interface EmailValidationBody {
  email: string
}

export interface EmailValidationProps {
  form: EmailValidationBody,
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleSubmit: (option: number, list?: string[], name?: string) => void,
  errors?: ErrorProps
}
