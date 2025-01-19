<template>
    <div>
      <h2 class="text-3xl font-bold text-center my-8">学生作业提交情况</h2>
      <p class="text-center mb-4">目前总共提交了{{ homeworkData.length }}份作业</p>
    </div>
    <div class="overflow-hidden bg-white shadow-sm sm:rounded-md px-4 py-4 sm:px-6 max-w-4xl mx-auto">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="homework in homeworkData" :key="homework.name" class="px-4 py-4 sm:px-6 max-w-4xl mx-auto cursor-pointer" @click="goToHomeworkCheck(homework.name, homework.student)">
          <div class="flex items-center justify-between">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="truncate text-sm font-medium text-gray-900">{{ homework.student }} 的 {{ homework.name }} 作业</h3>
                <div v-if="homework.status === 0" class="flex items-center space-x-1">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">未提交</span>
                </div>
                <div v-else-if="homework.status === 1" class="flex items-center space-x-1">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">已提交</span>
                </div>
                <div v-else-if="homework.status === 2" class="flex items-center space-x-1">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">已批改</span>
                </div>
              </div>
              <div v-if="homework.status !== 0" class="flex items-center space-x-1">
                <p class="mt-1 truncate text-sm text-gray-500">提交时间: {{ homework.timestamp }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
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
      const statusOrder = { 1: 2, 2: 0, 0: 1 }
      return statusOrder[b.status] - statusOrder[a.status]
    })

  } catch (error) {
    cleanJwt()
    router.push("/login")
    console.error('Failed to fetch homeworks:', error.message)
  }
})

const goToHomeworkCheck = (homeworkName, studentName) => {
    router.push({ name: 'HomeworkCheck', params: { name: homeworkName, student: studentName } })
}

</script>