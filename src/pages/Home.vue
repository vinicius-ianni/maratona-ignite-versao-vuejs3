<script lang="ts">
import Header from '../components/Header.vue'
import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import apolloClient from '../lib/apollo'
import gql from 'graphql-tag'
import { computed } from 'vue'

export default {
  data () {
    return {
      userName: '',
      userEmail: '',
      SucessMessage: '',
      UserIsValid: 'pending',
      EmailIsValid: 'pending'
    }
  },
  methods: {
    async saveForm () {
      provideApolloClient(apolloClient)

      interface setFormResponse {
        id: String
      }

      const FormQuery = gql`
        mutation QueryCreateSubscriber($name: String!, $email: String!) {
          createSubscriber(data: { name: $name, email: $email }) {
            id
          }
        }
      `
      const { mutate: createSubscriber } = useMutation<setFormResponse>(
        FormQuery,
        () => ({
          variables: {
            name: this.userName,
            email: this.userEmail
          }
        })
      )

      await createSubscriber()

//{"data":{"createSubscriber":{"id":"cl5mlqhpr22ek0clpin2c5evo","__typename":"Subscriber"}}}

      return {
        createSubscriber
      }
    },
    submitForm () {
      if (this.UserIsValid === 'valid' && this.EmailIsValid === 'valid') {
        console.log('enviando....')
        console.log(this.userName)
        console.log(this.userEmail)
        const result = this.saveForm()
        if (result) {
          console.log('resultado')
          console.log(result)
          this.SuccessMessage = 'Cadastro Enviado !'
        }
      }
    },
    validateForm (formValue) {
      if (formValue === 'user') {
        if (this.userName === '') {
          return (this.UserIsValid = 'invalid')
        } else {
          return (this.UserIsValid = 'valid')
        }
      }
      if (formValue === 'email') {
        if (this.userEmail === '') {
          return (this.EmailIsValid = 'invalid')
        } else {
          return (this.EmailIsValid = 'valid')
        }
      }
    }
  },
  components: {
    Header
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-blurBg bg-cover bg-no-repeat flex flex-col items-center"
  >
    <div
      class="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto"
    >
      <div class="max-w-[640px] ">
        <Header></Header>
        <h1 class="mt-8 text-[2.5rem] leading-tight">
          Construa uma <strong class="text-blue-300">aplicação</strong> do
          zero...
        </h1>
        <p class="mt-4 text-gray-200 leading-relaxed">
          Em uma semana você vira mestre
        </p>
      </div>
      <div class="p-8 bg-gray-700 border border-gray-500 rounded">
        <strong class="text-2xl mb-6 block">
          Inscreva-se gratuitamente
        </strong>
        <div class="flex flex-col w-full" v-if="SucessMessage !== ''"></div>
        <form
          @submit.prevent="submitForm"
          action=""
          class="flex flex-col gap-2 w-full"
          v-else
        >
          <input
            class="bg-gray-900 rounded px-5 h-14"
            type="text"
            placeholder="Seu nome completo"
            name="userName"
            v-model.trim="userName"
            @blur="validateForm('user')"
          />
          <p v-if="UserIsValid === 'invalid'">Informe o nome</p>
          <input
            class="bg-gray-900 rounded px-5 h-14"
            type="email"
            placeholder="Digite seu email"
            name="userEmail"
            v-model.trim="userEmail"
            @blur="validateForm('email')"
          />
          <p v-if="EmailIsValid === 'invalid'">Informe o email</p>
          <button
            type="submit"
            class="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors"
          >
            Garantir minha vaga
          </button>
        </form>
      </div>
    </div>
    <img src="/src/assets/code-mockup.png" alt="" class="mt-10" />
  </div>
</template>
