<script lang="ts" setup>
import { useNoteStore } from '@/stores/note'
import { computed } from 'vue'

const noteStore = useNoteStore()

const selectedNote = computed(() => noteStore.selectedNote)
</script>

<template>
  <div class="note-content-section">{{ selectedNote.title }}</div>
</template>

<style scoped>
.note-content-section {
  flex-grow: 1;
}
</style>
