<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import Video from '../components/Video.vue'
import Sidebar from '../components/Sidebar.vue'

export default defineComponent({
  props: {
    lessonName: { type: String, default: '' }
  },
  computed: {
    slug (): string {
      return this.lessonName
    }
  },
  components: {
    Header,
    Video,
    Sidebar
  }
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header></Header>
    <main class="flex flex-1" v-if="slug !== undefined">
      <Video :lessonSlug="slug"></Video>
      <Sidebar></Sidebar>
    </main>

    <main class="flex flex-1" v-else>
      <div class="flex-1"></div>
      <Sidebar></Sidebar>
    </main>
  </div>
</template>
