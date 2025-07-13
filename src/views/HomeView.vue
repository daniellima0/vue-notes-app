<script setup lang="ts">
import Folders from '@/components/Folders.vue'
import Notes from '@/components/Notes.vue'
import NoteContent from '@/components/NoteContent.vue'
</script>

<template>
  <main id="home-view">
    <Folders />
    <Notes />
    <NoteContent />
  </main>
</template>

<style scoped>
#home-view {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
