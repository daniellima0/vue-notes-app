import type { Folder } from '@/types/types'

/**
 * Gets all folders in localStorage.
 * @returns An array of folder.
 */
export function getFolders(): Folder[] {
  const folders = localStorage.getItem('folders')
  return folders ? JSON.parse(folders) : []
}

/**
 * Gets a folder by its ID.
 * @param id - The ID of the folder to retrieve.
 * @returns The folder object if found, otherwise undefined.
 */
export function getFolderById(id: string): Folder | undefined {
  const folders = getFolders()
  return folders.find((folder) => folder.id === id)
}

/**
 * Creates an empty folder and adds it to localStorage.
 * @param name - name of the folder to create
 * @returns The created folder object.
 */
export function createFolder(name: string): Folder {
  const folder: Folder = {
    id: crypto.randomUUID(),
    name,
    notes: [],
  }
  const folders = getFolders()
  folders.push(folder)
  localStorage.setItem('folders', JSON.stringify(folders))
  return folder
}

/**
 * Renames a folder by its ID.
 * @param id - The ID of the folder to rename.
 * @param newName - The new name for the folder.
 */
export function renameFolder(id: string, newName: string): void {
  const folders = getFolders()
  const folderIndex = folders.findIndex((folder) => folder.id === id)
  if (folderIndex !== -1) {
    folders[folderIndex].name = newName
    localStorage.setItem('folders', JSON.stringify(folders))
  } else {
    console.error(`Folder with ID ${id} not found.`)
  }
}

/**
 * Deletes a folder by its ID.
 * @param id - The ID of the folder to delete.
 */
export function deleteFolder(id: string): void {
  const folders = getFolders()
  const updatedFolders = folders.filter((folder) => folder.id !== id)
  localStorage.setItem('folders', JSON.stringify(updatedFolders))
}

