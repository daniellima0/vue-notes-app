import type { Folder } from '@/types/types'
import { defineStore } from 'pinia'
import { getFolders } from '@/services/folder-service'
import { ref } from 'vue'

export const useFolderStore = defineStore('folder', () => {
  const folders = ref(getFolders())
  const selectedFolder = ref({} as Folder)
  function selectFolder(folder: Folder) {
    selectedFolder.value = folder
  }

  return { folders, selectedFolder, selectFolder }
})
