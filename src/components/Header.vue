<template>
    <header class="bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
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
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
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
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { getUserFromToken, isLogin, cleanJwt, getUsername } from '../utils/auth'
  
  import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
  } from '@headlessui/vue'
  import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
  import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'

  const mobileMenuOpen = ref(false)
  const router = useRouter()
  const route = useRoute()
  
  const isLoggedIn = isLogin()
  let user = ref(null)

  if (isLoggedIn) {
    try {
      user.value = getUserFromToken()
    } catch (error) {
      console.error('Failed to decode token:', error)
      cleanJwt()
      router.push('/login')
    }
  } else {
    router.push('/login')
  }

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
  
  const navigation = ref([
    { name: '主页', href: '/' },
  ])
  </script>
  
  <style scoped>
  </style>