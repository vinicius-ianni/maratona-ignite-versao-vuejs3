<script lang="ts">

import { defineComponent } from 'vue'
import Lesson from './Lesson.vue'
import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import gql from 'graphql-tag'
import { computed } from 'vue'
import { isPast, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default defineComponent ({
  setup () {
    const cache = new InMemoryCache()

    const apolloClient = new ApolloClient({
      cache,
      uri:
        'https://api-us-west-2.graphcms.com/v2/cl5cjh0f905ac01ta2ym2foht/master'
    })

    provideApolloClient(apolloClient)

    interface getLessonsQueryResponse {
      id: String
      title: String
      slug: String
      availableAt: String
      description: String
      videoId: String
      type: 'class' | 'live'
    }

    const LessonsQuery = gql`
      query Lessons {
        lessons {
          id
          title
          slug
          availableAt
          description
          videoId
          lessonType
        }
      }
    `

    const { result, loading, error } = useQuery<getLessonsQueryResponse>(LessonsQuery)

    const lessonsData = computed(() => result.value?.lessons)

    return {
      lessonsData,
      loading,
      error
    }
  },
  components: { Lesson },
  methods: {
    convDate: function (dataString: string) {
      return format(new Date(dataString), "EEEE' • 'd' de 'MMMM' • 'h'h'mm", {
        locale: ptBR
      })
    },
    isAvailable (dataString: string) {
      return isPast(new Date(dataString))
    }
  }
})
</script>

<template>
  <aside class="w-[348px] bg-gray-1 p-6 border-l border-gray-600">
    <span class="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
      Cronograma de aulas
    </span>
    <div v-if="loading" class="flex flex-col gap-8">Loading...</div>
    <div v-if="lessonsData">
      <div class="flex flex-col gap-8 p-2" v-for="lesson in lessonsData">
        <Lesson
          :key="lesson.id"
          :id="lesson.id"
          :title="lesson.title"
          :slug="lesson.slug"
          :availableAt="convDate(lesson.availableAt)"
          :type="lesson.type"
          :IsLessonAvailable="isAvailable(lesson.availableAt)"
        ></Lesson>
      </div>
    </div>
  </aside>
</template>
