import type { Note } from '@/types/types'
import { defineStore } from 'pinia'
import { useFolderStore } from '@/stores/folder'
import { getNotesInFolder } from '@/services/note-service'
import { ref } from 'vue'

export const useNoteStore = defineStore('note', () => {
  const folderStore = useFolderStore()

  const notes = ref(getNotesInFolder(folderStore.selectedFolder.id))
  const selectedNote = ref({} as Note)

  function selectNote(note: Note) {
    selectedNote.value = note
  }

  return { notes, selectedNote, selectNote }
})
