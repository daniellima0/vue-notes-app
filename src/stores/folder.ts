import type { Folder } from '@/types/types'
import { defineStore } from 'pinia'

export const useFolderStore = defineStore('folder', {
  state: () => ({
    selectedFolder: {} as Folder,
  }),
  getters: {},
  actions: {
    selectFolder(folder: Folder) {
      this.selectedFolder = folder
    },
  },
})
