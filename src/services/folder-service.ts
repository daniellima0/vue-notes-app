import type { Folder } from '@/types/types'
import { useStorage } from '@vueuse/core'
import defaultData from '@/assets/default-data.json'
import { ref } from 'vue'

//TODO: Change this to use computed, so every time the localStorage changes, the UI changes too

const folders = useStorage<Folder[]>('folders', defaultData.folders)

const useFolders = () => {
  const loading = ref(false)
  const selectedFolder = ref<Folder | Record<string, never>>({})
  /**
   * Gets all folders.
   * @returns An array of folder.
   */
  async function getFolders() {
    return folders.value || []
  }

  /**
   * Gets a folder by its ID.
   * @param id - The ID of the folder to retrieve.
   * @returns The folder object if found, otherwise undefined.
   */
  async function getFolderById(id: string) {
    loading.value = true
    await new Promise((res) => setTimeout(res, 1000))
    loading.value = false
    selectedFolder.value = folders.value.find((folder) => folder.id === id) ?? {}
  }

  /**
   * Creates an empty folder and adds it to database.
   * @param name - name of the folder to create
   * @returns The created folder object.
   */
  async function createFolder(name: string) {
    const folder: Folder = {
      id: crypto.randomUUID(),
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    folders.value.push(folder)
    return folder
  }

  /**
   * Renames a folder by its ID.
   * @param id - The ID of the folder to rename.
   * @param newName - The new name for the folder.
   * @returns The updated folder object if found, otherwise undefined.
   */
  async function renameFolder(id: string, newName: string) {
    const folderIndex = folders.value.findIndex((folder) => folder.id === id)
    if (folderIndex !== -1) {
      folders.value[folderIndex].name = newName
      folders.value[folderIndex].updated_at = new Date().toISOString()
      return folders.value[folderIndex]
    } else {
      console.error(`Folder with ID ${id} not found.`)
    }
  }

  /**
   * Deletes a folder by its ID.
   * @param id - The ID of the folder to delete.
   * @returns The new array of folders after deletion, or undefined if the folder was not found.
   */
  async function deleteFolder(id: string) {
    const folderIndex = folders.value.findIndex((folder) => folder.id === id)
    if (folderIndex !== -1) {
      folders.value.splice(folderIndex, 1)
      return folders.value
    } else {
      console.error(`Folder with ID ${id} not found.`)
    }
  }

  return {
    folders,
    selectedFolder,
    loading,
    deleteFolder,
    getFolderById,
    getFolders,
    renameFolder,
  }
}

export default useFolders
