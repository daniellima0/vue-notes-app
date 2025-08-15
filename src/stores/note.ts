import type { Note } from '@/types/types'
import { defineStore } from 'pinia'
import { useFolderStore } from '@/stores/folder'
import { getNotesInFolder } from '@/services/note-service'

const folderStore = useFolderStore()

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: getNotesInFolder(folderStore.selectedFolder.id),
    selectedNote: {} as Note,
  }),
  getters: {},
  actions: {
    selectNote(note: Note) {
      this.selectedNote = note
    },
  },
})
