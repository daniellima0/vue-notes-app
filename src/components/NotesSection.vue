<script lang="ts" setup>
import { useNoteStore } from '@/stores/note'
import { computed } from 'vue'

const noteStore = useNoteStore()

const notes = computed(() => noteStore.selectedFolderNotes)
const selectedNote = computed(() => noteStore.selectedNote)
</script>

<template>
  <div class="notes-section">
    <ul class="notes-list">
      <li
        v-for="note in notes"
        :key="note.id"
        :class="{ active: selectedNote.id === note.id }"
        @click="noteStore.selectNote(note)"
      >
        <div class="note">
          <p>{{ note.title }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.notes-section {
  width: 30%;
  max-width: 390px;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
}
</style>
