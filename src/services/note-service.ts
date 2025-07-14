import type { Folder, Note } from '@/types/types'
import { getFolderById } from './folder-service'

/**
 * Gets all notes in a specific folder.
 * @param folderId - The ID of the folder to retrieve notes from.
 * @returns An array of notes in the specified folder or undefined if the folder does not exist.
 */
export function getNotesInFolder(folderId: string): Note[] | undefined {
  const folder = getFolderById(folderId)
  return folder ? folder.notes : undefined
}

/**
 * Gets a note by its ID within a specific folder.
 * @param folderId - The ID of the folder containing the note.
 * @param noteId - The ID of the note to retrieve.
 * @returns The note object if found, otherwise undefined.
 */
export function getNoteById(folderId: string, noteId: string): Note | undefined {
  const notes = getNotesInFolder(folderId)
  return notes ? notes.find((note) => note.id === noteId) : undefined
}

/**
 * Adds a new note to a specific folder.
 * @param folderId - The ID of the folder to add the note to.
 * @param title - The title of the new note.
 * @param content - The content of the new note.
 * @returns The created note object or undefined if the folder does not exist.
 */
export function addNoteToFolder(
  folderId: string,
  title: string,
  content: string,
): Note | undefined {
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    content,
    lastModifiedAt: new Date().toISOString(),
  }
  const folder = getFolderById(folderId)
  if (!folder) {
    console.error(`Folder with ID ${folderId} not found.`)
    return
  }
  folder.notes.push(note)
  return note
}

/**
 * Removes a note from a specific folder.
 * @param folderId - The ID of the folder containing the note.
 * @param noteId - The ID of the note to remove.
 * @returns The updated folder object or undefined if the folder does not exist.
 */
export function removeNoteFromFolder(folderId: string, noteId: string): Folder | undefined {
  const folder = getFolderById(folderId)
  if (!folder) {
    console.error(`Folder with ID ${folderId} not found.`)
    return
  }
  folder.notes = folder.notes.filter((note) => note.id !== noteId)
  return folder
}

/**
 * Renames a note in a specific folder.
 * @param folderId - The ID of the folder containing the note.
 * @param noteId - The ID of the note to rename.
 * @param newTitle - The new title for the note.
 * @returns The updated note object if found, otherwise undefined.
 */
export function renameNoteInFolder(
  folderId: string,
  noteId: string,
  newTitle: string,
): Note | undefined {
  const folder = getFolderById(folderId)
  if (!folder) {
    console.error(`Folder with ID ${folderId} not found.`)
    return
  }

  const noteIndex = folder.notes.findIndex((note) => note.id === noteId)
  if (noteIndex == -1) {
    console.error(`Note with ID ${noteId} not found in folder ${folderId}.`)
  }
  folder.notes[noteIndex].title = newTitle
  folder.notes[noteIndex].lastModifiedAt = new Date().toISOString()
  return folder.notes[noteIndex]
}
