<template>
  <div>
    <h2 class="text-3xl font-bold text-center my-8">学生作业提交情况</h2>
    <p class="text-center mb-4">目前总共提交了{{ homeworkData.length }}份作业</p>
  </div>
    <div class="overflow-x-auto max-w-screen-xl mx-auto">
      <div class="block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">学生</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">作业名</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">完成状态</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">提交时间</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="homework in homeworkData" :key="homework.name" @click="goToHomeworkCheck(homework.name, homework.student)" class="cursor-pointer">
                <td class="py-5 pr-3 pl-4 text-sm whitespace-nowrap text-gray-900 sm:pl-6">
                  <div>{{ homework.student }}</div>
                </td>
                <td class="px-3 py-5 text-sm whitespace-nowrap text-gray-900">
                  <div>{{ homework.name }}</div>
                </td>
                <td class="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                  <span v-if="homework.status === 0" class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-200/20 ring-inset">未提交</span>
                  <span v-else-if="homework.status === 1" class="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-200/20 ring-inset">已提交</span>
                  <span v-else-if="homework.status === 2" class="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-red-200/20 ring-inset">已批改</span>
                </td>
                <td class="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                  <div>{{ homework.timestamp }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTeacherHomework } from '@/api/homework.js'
import { cleanJwt } from '../utils/auth';
import router from '../router';

const homeworks = ref({ homework_data: {} })
const homeworkData = ref([])

onMounted(async () => {
  try {
    const data = await getTeacherHomework()
    homeworks.value = data

    // 将 homework_data 对象转换为数组
    homeworkData.value = Object.values(homeworks.value.homework_data).sort((a, b) => {
      const statusOrder = { 1: 2, 2: 0, 0: 1 }
      const statusComparison = statusOrder[b.status] - statusOrder[a.status]
      if (statusComparison !== 0) {
        return statusComparison
      }
      return new Date(b.timestamp) - new Date(a.timestamp)
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