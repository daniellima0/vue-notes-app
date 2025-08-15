import type { Folder, Note } from '@/types/types'
import { useStorage } from '@vueuse/core'
import defaultData from '@/assets/default-data.json'
import useFolders from './folder-service'

//TODO: Change this to use computed, so every time the localStorage changes, the UI changes too
//TODO: Encapsulate methods in a composition

const notesStorage = useStorage<Note[]>('notes', defaultData.notes)

/**
 * Gets all notes in a specific folder.
 */
export function getNotesInFolder(folderId: string): Note[] {
  return notesStorage.value.filter((note) => note.folder_id === folderId)
}

/**
 * Gets a note by its ID.
 */
export function getNoteById(noteId: string): Note | undefined {
  return notesStorage.value.find((note) => note.id === noteId)
}

/**
 * Adds a new note associated with a folder.
 */
export function addNoteToFolder(
  folderId: string,
  title: string,
  content: string,
): Note | undefined {
  const folders = useFolders()
  const folder = folders.getFolderById(folderId)
  if (!folder) {
    console.error(`Folder with ID ${folderId} not found.`)
    return
  }

  const note: Note = {
    id: crypto.randomUUID(),
    folder_id: folderId,
    title,
    content,
    last_modified_at: new Date().toISOString(),
  }

  notesStorage.value.push(note)
  return note
}

/**
 * Removes a note by its ID.
 */
export function removeNote(noteId: string): Note | undefined {
  const index = notesStorage.value.findIndex((n) => n.id === noteId)
  if (index === -1) {
    console.error(`Note with ID ${noteId} not found.`)
    return
  }
  const [removed] = notesStorage.value.splice(index, 1)
  return removed
}

/**
 * Renames a note.
 */
export function renameNote(noteId: string, newTitle: string): Note | undefined {
  const note = getNoteById(noteId)
  if (!note) {
    console.error(`Note with ID ${noteId} not found.`)
    return
  }
  note.title = newTitle
  note.last_modified_at = new Date().toISOString()
  return note
}
