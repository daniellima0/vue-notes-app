export interface Folder {
  id: string
  name: string
  notes: Note[]
}

export interface Note {
  id: string
  title: string
  content: string
  lastModifiedAt: string
}
