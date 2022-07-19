<script lang="ts">
import { computed, toRefs, defineComponent } from 'vue'
import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import apolloClient from '../lib/apollo'
import gql from 'graphql-tag'
import {
  PhDiscordLogo,
  PhLightning,
  PhFileArrowDown,
  PhCaretRight
} from 'phosphor-vue'

import { Player, Youtube, Ui, DefaultUi } from '@vime/vue-next'
import '@vime/core/themes/default.css'

export default defineComponent({
  props: {
    lessonSlug: { type: String, default: '' }
  },
  setup (props) {
    provideApolloClient(apolloClient)

    interface teacherItem {
      avatarURL: String
      bio: String
      name: String
    }

    interface getLessonQueryResponse {
      id: String
      title: String
      slug: String
      availableAt: String
      description: String
      videoId: String
      lessonType: String
      teacher: Record<string, teacherItem>
    }

    let slugVar = toRefs(props).lessonSlug

    const Lesson_Query = gql`
      query Lesson($where: LessonWhereUniqueInput!) {
        lesson(where: $where) {
          videoId
          description
          title
          lessonType
          slug
          teacher {
            avatarURL
            bio
            name
          }
        }
      }
    `

    const { result, loading, error } = useQuery<getLessonQueryResponse>(
      Lesson_Query,
      { where: { slug: slugVar } }
    )

    const lessonData = computed(() => result.value?.lesson)

    return {
      lessonData,
      loading,
      error
    }
  },

  components: {
    PhDiscordLogo,
    PhLightning,
    PhFileArrowDown,
    PhCaretRight,
    Player,
    Youtube,
    Ui,
    DefaultUi
  }
})
</script>

<template>
  <div class="flex-1">
    <div class="bg-black flex justify-center" v-if="lessonData">
      <div class="h-full w-full max-w-[1100px] max-h[60vh] aspect-video">
        <Player playsinline ref="player" vPlaybackReady="onPlaybackReady">
          <Youtube crossorigin="" :videoId="lessonData.videoId"></Youtube>
          <Ui>
            <DefaultUi> </DefaultUi>
          </Ui>
        </Player>
      </div>
    </div>

    <div class="bg-black p-8 max-w-[1100] mx-auto" v-if="lessonData">
      <div class="flex items-start gap-16">
        <!-- titulo / descricao -->
        <div class="flex-1">
          <h1 class="text-2xl font-bold">
            {{ lessonData.title }}
          </h1>
          <p class="mt-4 text-gray-200 leading-relaxed">
            {{ lessonData.description }}
          </p>
          <!-- Avatar  -->
          <div class="flex items-center gap-4 mt-6">
            <img
              class="h-16 w-16 rounded-full border-2 border-blue-500"
              :src="lessonData.teacher.avatarURL"
            />
            <div class="leading-relaxed">
              <strong class="font-bold text-2xl block"
                >{{ lessonData.teacher.name }}
              </strong>
              <span class="text-gray-200 text-sm block">{{
                lessonData.teacher.bio
              }}</span>
            </div>
          </div>
        </div>
        <!-- Botoes -->
        <div class="flex flex-col gap-4">
          <a
            href="#"
            class="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-color"
          >
            <PhDiscordLogo size="24"></PhDiscordLogo> Comunidade Discord
          </a>
        </div>
        <div class="flex flex-col gap-4">
          <a
            href="#"
            class="p-4 text-sm bg-gray-900 border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors"
          >
            <PhLightning size="24"></PhLightning> Acesse o desafio
          </a>
        </div>
      </div>
      <!-- Cards -->
      <div class="gap-8 mt-20 grid grid-cols-2">
        <a
          class="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          href="#"
        >
          <div class="bg-green-700 h-full padding-6 flex items-center">
            <PhFileArrowDown size="40"></PhFileArrowDown>
          </div>
          <div class="py-6 leading-relaxed">
            <strong class="text-2xl">
              Material Complementar
              <p class="text-sm text-gray-200 mt-2">
                Acesse o material complementar
              </p>
            </strong>
          </div>
          <div class="h-full p-6 items-center">
            <PhCaretRight size="24"></PhCaretRight>
          </div>
        </a>

        <a
          class="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          href="#"
        >
          <div class="bg-green-700 h-full padding-6 flex items-center">
            <PhFileArrowDown size="40"></PhFileArrowDown>
          </div>
          <div class="py-6 leading-relaxed">
            <strong class="text-2xl">
              Wallpapers exclusivos
              <p class="text-sm text-gray-200 mt-2">
                baixe wallpapers
              </p>
            </strong>
          </div>
          <div class="h-full p-6 items-center">
            <PhCaretRight size="24"></PhCaretRight>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
