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
  messages: Message[]
  name: string
  updated_at: string
  notifications: number | undefined
}

export interface Auth {
  user: User
}
