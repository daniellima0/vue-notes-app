<script lang="ts" setup>
import { useFolderStore } from '@/stores/folder'
import { useNoteStore } from '@/stores/note'
import { computed } from 'vue'

const noteStore = useNoteStore()
const folderStore = useFolderStore()

const notes = computed(() => noteStore.selectedFolderNotes)
const selectedNote = computed(() => noteStore.selectedNote)
</script>

<template>
  <div class="notes-section">
    <div v-if="folderStore.loading">Loading...</div>
    <ul v-else class="notes-list">
      <li
        v-for="note in notes"
        :key="note.id"
        :class="{ active: selectedNote.id === note.id }"
        @click="noteStore.selectNote(note)"
      >
        <div class="note">
          <p class="note-title">{{ note.title }}</p>
          <p class="note-content">{{ note.content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.notes-section {
  padding: 1rem;
  width: 30%;
  max-width: 390px;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.note {
  padding: 0.8rem;
}

.note-title {
  font-weight: bold;
}

.note-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text-gray);
}

.active {
  background-color: var(--color-background-note-active);
  border-radius: 5px;
}
</style>
