<template>
    <div>
        <Header />
        <main>
            
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTeacherHomeworks } from '@/api/homework.js'
import { cleanJwt } from '../utils/auth';
import router from '../router';

const homeworks = ref({ homework_data: {} })
const homeworkData = ref([])

onMounted(async () => {
  try {
    const data = await getTeacherHomeworks()
    homeworks.value = data

    // 将 homework_data 对象转换为数组
    homeworkData.value = Object.values(homeworks.value.homework_data).sort((a, b) => {
      const statusOrder = { 1: 0, 2: 1, 0: 2 }
      return statusOrder[b.status] - statusOrder[a.status]
    })
    console.log(homeworkData.value)

  } catch (error) {
    cleanJwt()
    router.push("/login")
    console.error('Failed to fetch homeworks:', error.message)
  }
})
</script>