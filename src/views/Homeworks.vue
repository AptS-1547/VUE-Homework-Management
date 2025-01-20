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
  import { useRoute } from 'vue-router'
  import { getUserRole } from '../utils/auth'
  import Header from '../components/Header.vue'
  import HomeworkUpload from '@/student/HomeworkUpload.vue'
  import HomeworkDetail from '@/student/HomeworkDetail.vue'
  import HomeworkCheck from '../teacher/HomeworkCheck.vue'

  const route = useRoute()
  const dynamicComponent = shallowRef(null)

  onMounted(() => {
    const role = getUserRole()
    if (role === 'student'|| role === 'classrep') {
      if (route.name === 'HomeworkUpload') {
        dynamicComponent.value = HomeworkUpload
      } else {
        dynamicComponent.value = HomeworkDetail
      }
    } else if (role === 'teacher') {
      if (route.name === 'HomeworkCheck') {
        dynamicComponent.value = HomeworkCheck
      } else {
        dynamicComponent.value = HomeworkDetail
      }
    } else {
      window.location.href = '/404'
    }
  })
  
  </script>