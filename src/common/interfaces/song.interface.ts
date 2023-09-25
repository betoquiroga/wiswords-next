import { Style } from "./style.interface"

export interface SongBase {
  title: string
  author: string
  active: boolean
  style?: Style
  idStyle?: number | null
}

export interface Song extends SongBase {
  id: number
}
