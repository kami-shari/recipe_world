export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: string
          title: string
          description: string
          servings: number
          instructions: string
          imageURL: string | null
          rating: number
          category_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          servings: number
          instructions: string
          imageURL?: string | null
          rating: number
          category_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          servings?: number
          instructions?: string
          imageURL?: string | null
          rating?: number
          category_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}