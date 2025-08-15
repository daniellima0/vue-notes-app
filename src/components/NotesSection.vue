<script lang="ts" setup>
import { useFolderStore } from '@/stores/folder'
import { computed } from 'vue'

const folderStore = useFolderStore()
const folder = computed(() => folderStore.selectedFolder)
</script>

<template>
  <div class="notes-section">Notes {{ folder.id }}</div>
</template>

<style scoped>
.notes-section {
  width: 30%;
  max-width: 390px;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
}
</style>
