import type { Folder } from '@/types/types'
import { defineStore } from 'pinia'
import { getFolders } from '@/services/folder-service'

export const useFolderStore = defineStore('folder', {
  state: () => ({
    folders: getFolders(),
    selectedFolder: {} as Folder,
  }),
  getters: {},
  actions: {
    selectFolder(folder: Folder) {
      this.selectedFolder = folder
    },
  },
})
