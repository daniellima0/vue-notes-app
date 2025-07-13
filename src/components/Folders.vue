<script setup lang="ts">
import { ref } from 'vue'
import type { Folder } from '@/types/types'
import { getFolders } from '@/services/folder-service'

let folders: Folder[] = getFolders()

let foldersRef = ref(folders)
let selectedFolder = ref<Folder>(folders[0])
</script>

<template>
  <div id="folders">
    <h2>Folders</h2>
    <ul id="folder-list">
      <li
        v-for="folder in foldersRef"
        v-on:click="selectedFolder = folder"
        :key="folder.id"
        :class="{ active: selectedFolder.id === folder.id }"
      >
        <div id="folder-left">
          <i class="pi pi-folder-open"></i>
          <p>{{ folder.name }}</p>
        </div>
        <p id="notes-amount">{{ folder.notes.length }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#folders {
  padding: 0 1rem;
  width: 20%;
  max-width: 260px;
  background-color: var(--color-background-gray);
  resize: horizontal;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
}

h2 {
  padding: 0 0.5rem;
}

#folder-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  border-radius: 0.3rem;
  padding: 0.5rem 0.5rem;
  cursor: default;
}

.active {
  background-color: var(--color-background-active);
}

#folder-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

i {
  color: var(--color-yellow);
}

#notes-amount {
  color: var(--color-text-gray);
}
</style>
