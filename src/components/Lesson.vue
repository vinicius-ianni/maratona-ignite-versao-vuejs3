<script lang="ts">
import { PhCheckCircle, PhLock } from 'phosphor-vue'

export default {
  data () {
    return { ActiveSlug: '' }
  },
  props: {
    id: String,
    title: String,
    slug: String,
    description: String,
    availableAt: String,
    videoId: String,
    type: String,
    IsLessonAvailable: Boolean
  },
  components: { PhCheckCircle, PhLock }
}
</script>

<template>
  <RouterLink
    :to="{ name: 'Events/Lesson', params: { lessonName: slug } }"
    class="group"
  >
    <span class="text-gray-300 ">
      {{ availableAt }}
    </span>
    <div
      class="rounded border border-gray-500 group-hover:border-green-500 p-4 mt-2"
    >
      <header class="flex itens-center justify-between">
        <span
          v-if="IsLessonAvailable"
          class="text-sm text-blueN  font-medium flex itens-center gap-2"
        >
          <PhCheckCircle size="20"></PhCheckCircle>
          Conteudo Liberado
        </span>
        <span
          v-else
          class="text-sm text-orange-500  font-medium flex itens-center gap-2"
        >
          <PhLock size="20"></PhLock>
          Em breve
        </span>

        <span
          class="text-xs rounded py-[0.125rem] px-2 text-white border-greenN font-bold"
        >
          {{ type === 'live' ? 'AO VIVO' : 'Aula Prática' }}
        </span>
      </header>
      <strong class="text-gray-200 mt-5 block">
        {{ title }}
      </strong>
    </div>
  </RouterLink>
</template>
