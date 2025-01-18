<template>
  <div>
    <h2 class="text-3xl font-bold text-center my-8">查看你的作业</h2>
    <p class="text-center mb-4">老师共布置了{{ homeworkData.length }}个作业</p>
    <div v-if="homeworkData.length">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-12">
        <li v-for="homework in homeworkData" :key="homework.name" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-sm">
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="truncate text-sm font-medium text-gray-900">{{ homework.name }}</h3>
                <div v-if="homework.status === 0" class="flex items-center space-x-1">
                  <span class="inline-flex shrink-0 items-center rounded-full bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">未提交</span>
                </div>
                <div v-else-if="homework.status === 1" class="flex items-center space-x-1">
                  <span class="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">已提交</span>
                </div>
                <div v-else-if="homework.status === 2" class="flex items-center space-x-1">
                  <span class="inline-flex shrink-0 items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">已批改</span>
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
    <div v-else>
      <p class="text-center text-gray-500">暂时没有作业呢 ☆*: .｡. o(≧▽≦)o .｡.:*☆</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getStudentHomeworks } from '@/api/index.js'
import { cleanJwt } from '../utils/auth';
import router from '../router';

const homeworks = ref({ homework_data: {} })
const homeworkData = ref([])

onMounted(async () => {
  try {
    const data = await getStudentHomeworks()
    homeworks.value = data

    // 将 homework_data 对象转换为数组
    homeworkData.value = Object.values(homeworks.value.homework_data).sort((a, b) => {
      const statusOrder = { 1: 0, 2: 1, 0: 2 }
      return statusOrder[b.status] - statusOrder[a.status]
    })

  } catch (error) {
    cleanJwt()
    router.push("/login")
    console.error('Failed to fetch homeworks:', error.message)
  }
})
</script>
