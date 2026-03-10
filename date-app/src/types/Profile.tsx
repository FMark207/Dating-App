export interface Profile {
  id?: string
  name: string
  age: number
  image: string
  location?: string
  distance?: string
  bio?: string
  shortDescription?: string
  interests: string[]
  fun_facts: string[]
  isMatched?: boolean
  chatGame?: {
    message: string
    options: Array<{ id: string; text: string }>
    correctOptionId: string
  }
}
