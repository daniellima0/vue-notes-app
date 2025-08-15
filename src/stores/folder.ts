import type { Folder } from '@/types/types'
import { defineStore } from 'pinia'
import useFolders from '@/services/folder-service'
import { ref } from 'vue'

export const useFolderStore = defineStore('folder', () => {
  const { folders, getFolderById, selectedFolder, loading } = useFolders()

  function selectFolder(id: string) {
    getFolderById(id)
  }

  return { folders, selectedFolder, selectFolder, loading }
})
