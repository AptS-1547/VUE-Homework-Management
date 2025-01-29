<template>
    <header class="bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">作业管理系统</span>
          <img class="h-8 w-auto" src="@/assets/favicon.svg" alt="Your Company" />
        </a>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm/6 font-semibold text-gray-900">{{ item.name }}</a>
          <a v-if="!isLoggedIn" href="#" @click.prevent="navigateTo('Login')" class="text-sm/6 font-semibold text-gray-900">登录 <span aria-hidden="true">&rarr;</span></a>
          <div v-else>
            <a href="#" class="text-sm/6 font-semibold text-gray-900">Hello, {{ getUsername() }}</a>
            <a @click.prevent="logout" class="ml-6 cursor-pointer font-semibold text-red-600">Logout</a>
          </div>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-10" />
        <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="/" class="-m-1.5 p-1.5">
              <span class="sr-only">作业管理系统</span>
              <img class="h-8 w-auto" src="@/assets/favicon.svg" alt="Your Company" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 text-right">
            <a v-for="item in navigation" :key="item.name" :href="item.href" class="block text-sm/6 font-semibold text-gray-900 mb-4">{{ item.name }}</a>
            <a v-if="!isLoggedIn" href="#" @click.prevent="navigateTo('Login')" class="block text-sm/6 font-semibold text-gray-900 mb-4">登录 <span aria-hidden="true">&rarr;</span></a>
            <div v-else>
              <a href="#" class="block text-sm/6 font-semibold text-gray-900 mb-4">Hello, {{ getUsername() }}</a>
              <a href="#" @click.prevent="logout" class="block text-sm/6 font-semibold text-red-600">Logout</a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { getUserFromToken, isLogin, cleanJwt, getUsername } from '../utils/auth'
  
  import {
    Dialog,
    DialogPanel,
  } from '@headlessui/vue'
  import {
    Bars3Icon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'

  const mobileMenuOpen = ref(false)
  const router = useRouter()
  const route = useRoute()
  const navigation = ref()
  const isLoggedIn = ref(isLogin())
  let user = ref(null)

  watch(route, () => {
    isLoggedIn.value = isLogin()
    if (isLoggedIn) {
      try {
        user.value = getUserFromToken()
      } catch (error) {
        console.error('Failed to decode token:', error)
        cleanJwt()
        router.push('/login')
      }
    } else if (route.name === 'AboutView') {
      router.push('/about')
    } else {
      router.push('/login')
    }

    if (user.value && user.value.role === 'student') {
      navigation.value = [
        { name: '首页', href: '/' },
      ]
    } else if (user.value && user.value.role === 'classrep') {
      navigation.value = [
        { name: '首页', href: '/' },
        { name: '作业上传状态', href: '/homework' },
      ]
    } else if (user.value && user.value.role === 'teacher') {
      navigation.value = [
        { name: '首页', href: '/' },
      ]
    } else {
      navigation.value = [
        { name: '首页', href: '/' },
        { name: '关于', href: '/about' },
      ]
    }
  }, { immediate: true })

  function logout() {
    cleanJwt()
    router.push('/login')
  }

  function navigateTo(componentName) {
    if (componentName === 'Login' && route.path !== '/login') {
      import('../views/Login.vue').then((module) => {
        router.push('/login')
      })
    }
  }
  </script>
  
  <style scoped>
  </style>