import type { Note } from '@/types/types'
import { getFolderById, getFolders } from './folder-service'

/**
 * Gets all notes in a specific folder.
 * @param folderId - The ID of the folder to retrieve notes from.
 * @returns An array of notes in the specified folder.
 */
export function getNotesInFolder(folderId: string): Note[] {
  const folder = getFolderById(folderId)
  return folder ? folder.notes : []
}

/**
 * Gets a note by its ID within a specific folder.
 * @param folderId - The ID of the folder containing the note.
 * @param noteId - The ID of the note to retrieve.
 * @returns The note object if found, otherwise undefined.
 */
export function getNoteById(folderId: string, noteId: string): Note | undefined {
  const notes = getNotesInFolder(folderId)
  return notes.find((note) => note.id === noteId)
}

/**
 * Adds a new note to a specific folder.
 * @param folderId - The ID of the folder to add the note to.
 * @param title - The title of the new note.
 * @param content - The content of the new note.
 * @returns The created note object.
 */
export function addNoteToFolder(folderId: string, title: string, content: string): Note {
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    content,
    lastModifiedAt: new Date().toISOString(),
  }
  const folder = getFolderById(folderId)
  if (folder) {
    folder.notes.push(note)
    const folders = getFolders()
    const folderIndex = folders.findIndex((f) => f.id === folderId)
    if (folderIndex !== -1) {
      folders[folderIndex] = folder
      localStorage.setItem('folders', JSON.stringify(folders))
    }
  } else {
    console.error(`Folder with ID ${folderId} not found.`)
  }
  return note
}

/**
 * Removes a note from a specific folder.
 * @param folderId - The ID of the folder containing the note.
 * @param noteId - The ID of the note to remove.
 */
export function removeNoteFromFolder(folderId: string, noteId: string): void {
  const folder = getFolderById(folderId)
  if (folder) {
    folder.notes = folder.notes.filter((note) => note.id !== noteId)
    const folders = getFolders()
    const folderIndex = folders.findIndex((f) => f.id === folderId)
    if (folderIndex !== -1) {
      folders[folderIndex] = folder
      localStorage.setItem('folders', JSON.stringify(folders))
    }
  } else {
    console.error(`Folder with ID ${folderId} not found.`)
  }
}

/**
 * Renames a note in a specific folder.
 * @param folderId - The ID of the folder containing the note.
 * @param noteId - The ID of the note to rename.
 * @param newTitle - The new title for the note.
 */
export function renameNoteInFolder(folderId: string, noteId: string, newTitle: string): void {
  const folder = getFolderById(folderId)
  if (folder) {
    const noteIndex = folder.notes.findIndex((note) => note.id === noteId)
    if (noteIndex !== -1) {
      folder.notes[noteIndex].title = newTitle
      folder.notes[noteIndex].lastModifiedAt = new Date().toISOString()
      const folders = getFolders()
      const folderIndex = folders.findIndex((f) => f.id === folderId)
      if (folderIndex !== -1) {
        folders[folderIndex] = folder
        localStorage.setItem('folders', JSON.stringify(folders))
      }
    } else {
      console.error(`Note with ID ${noteId} not found in folder ${folderId}.`)
    }
  } else {
    console.error(`Folder with ID ${folderId} not found.`)
  }
}
