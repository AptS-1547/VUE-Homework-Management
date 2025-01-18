<template>
  <div>
    <Header />
    <main>
      <component :is="dynamicComponent" />
    </main>
  </div>
</template>

<script setup>
import { shallowRef, onMounted } from 'vue'
import { getUserRole } from '../utils/auth'
import Header from '../components/Header.vue'
import HomeworkView from '@/student/HomeworkView.vue'
import HomeworkOverview from '@/teacher/HomeworkOverview.vue'

const dynamicComponent = shallowRef(null)

onMounted(() => {
  const role = getUserRole()
  if (role === 'student') {
    dynamicComponent.value = HomeworkView
  } else if (role === 'teacher') {
    dynamicComponent.value = HomeworkOverview
  } else {
    console.error('Unknown role:', role)
  }
})
</script>