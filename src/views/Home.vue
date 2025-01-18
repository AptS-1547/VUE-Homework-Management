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

const dynamicComponent = shallowRef(null)

onMounted(() => {
  const role = getUserRole()
  if (role === 'student') {
    dynamicComponent.value = HomeworkView
  } else {
    // 根据其他角色加载不同的组件
    dynamicComponent.value = null // 或者设置为其他组件
  }
})
</script>