<script setup lang="ts">
import { RouterView } from 'vue-router'
import data from '@/assets/data.json'
import { createFolder } from '@/services/folder-service'
import { addNoteToFolder } from '@/services/note-service'

function createDatabase() {
  // Check if folders already exist to avoid overwriting
  const existing = localStorage.getItem('folders')
  if (existing) {
    console.log('Database already exists. Skipping creation.')
    return
  }

  // Iterate through folders in the imported JSON data
  for (const folderData of data.folders) {
    const folder = createFolder(folderData.name)

    // Add notes to the newly created folder
    for (const note of folderData.notes) {
      addNoteToFolder(folder.id, note.title, note.content)
    }
  }

  console.log('Database successfully initialized from data.json.')
}

createDatabase()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
