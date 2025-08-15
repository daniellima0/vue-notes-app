export interface Folder {
  id: string
  name: string
  // ISO date strings
  created_at: string
  updated_at: string
}

export interface Note {
  id: string
  // foreign key to Folder.id
  folder_id: string
  title: string
  content: string
  // ISO date string
  last_modified_at: string
}
