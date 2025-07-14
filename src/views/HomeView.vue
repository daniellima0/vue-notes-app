<script setup lang="ts">
import FoldersSection from '@/components/FoldersSection.vue'
import NotesSection from '@/components/NotesSection.vue'
import NoteContentSection from '@/components/NoteContentSection.vue'
</script>

<template>
  <main id="home-view">
    <FoldersSection />
    <NotesSection />
    <NoteContentSection />
  </main>
</template>

<style scoped>
#home-view {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
