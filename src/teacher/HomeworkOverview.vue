  <template>
    <div class="overflow-hidden rounded-lg bg-white shadow-sm py-1">
      <div class="flex flex-wrap items-center gap-6 sm:flex-nowrap px-4 py-5 sm:p-6">
        <h1 class="gap-4 sm:gap-6 sm:border-gray-200 sm:border-r">
          <div class="text-2xl font-semibold text-gray-900 sm:px-8">学生作业提交情况</div>
          <div class="text-sm text-gray-500 sm:px-8">目前总共提交了{{ homeworkData.length }}份作业</div>
        </h1>
        <div class="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-none sm:w-auto sm:pl-8 sm:text-sm/7">
          <a href="#" :class="viewUpdateOption ? 'text-indigo-600' : 'text-gray-700'" @click="changeView(0)">已提交视图</a>
          <a href="#" :class="viewUpdateOption ? 'text-gray-700' : 'text-indigo-600'" @click="changeView(1)">总表视图</a>
        </div>
        <a @click="exportTableToExcel('作业总表.xlsx')" href="#" class="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          导出作业总表
        </a>
      </div>
    </div>
    <div :class="['overflow-x-auto', 'max-w-screen-xl', 'mx-auto', 'my-6', { 'hidden': viewUpdateOption }]">
      <div class="block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300" id="homework-summary">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">学生</th>
                <th v-for="homework in homeworkList" :key="homework" scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ homework }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(hwStatus, StuName, index ) in homeworkUploadStatus" :key="StuName" :disabled="!hasPermission" :class="hasPermission ? 'cursor-pointer' : 'cursor-not-allowed'" @click="hasPermission ? goToHomeworkCheck(homework.name, homework.student) : null">
                <td class="py-5 pr-3 pl-4 text-sm whitespace-nowrap text-gray-900 sm:pl-6">
                  <div>{{ StuName }}</div>
                </td>
                <td v-for="status in hwStatus" class="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                  <span v-if="status === 0" class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-200/20 ring-inset">未提交</span>
                  <span v-else-if="status === 1" class="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-200/20 ring-inset">已提交</span>
                  <span v-else-if="status === 2" class="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-red-200/20 ring-inset">已批改</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div :class="['overflow-x-auto', 'max-w-screen-xl', 'mx-auto', 'my-6', { 'hidden': !viewUpdateOption }]">
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
              <tr :disabled="!hasPermission" v-for="homework in homeworkData" :key="homework.name" :class="hasPermission ? 'cursor-pointer' : 'cursor-not-allowed'" @click="hasPermission ? goToHomeworkCheck(homework.name, homework.student) : null">
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
import { writeFile, utils } from 'xlsx'
  import { getTeacherHomework, getUploadStatus } from '@/api/homework.js'
  import { cleanJwt, getUserRole } from '../utils/auth';
  import router from '../router';

  const homeworks = ref({ homework_data: {} })
  const homeworkData = ref([])
  const homeworkStatus = ref({})
  const homeworkList = ref([])
  const homeworkUploadStatus = ref({})
  const hasPermission = ref(false)
  const viewUpdateOption = ref(true)

  const changeView = (num) => {
    if (num === 0) {
      viewUpdateOption.value = true
    } else {
      viewUpdateOption.value = false
    }
  }

  onMounted(async () => {
    try {
      if (getUserRole() === 'teacher') {
        hasPermission.value = true
      }

      const homworkData = await getTeacherHomework()
      homeworks.value = homworkData

      // 将 homework_data 对象转换为数组
      homeworkData.value = Object.values(homeworks.value.homework_data).sort((a, b) => {
        const statusOrder = { 1: 2, 2: 0, 0: 1 }
        const statusComparison = statusOrder[b.status] - statusOrder[a.status]
        if (statusComparison !== 0) {
          return statusComparison
        }
        return new Date(b.timestamp) - new Date(a.timestamp)
      })

      const statusData = await getUploadStatus()
      homeworkStatus.value = statusData
      homeworkList.value = Object.values(homeworkStatus.value.homework_list)

      for (let studentName in homeworkStatus.value.return_data) {
        let temp_data = new Array(homeworkList.value.length).fill(0);
        homeworkStatus.value.return_data[studentName].forEach((homework) => {
          for (let homeworkName in homework) {
            const index = homeworkList.value.indexOf(homeworkName)
            temp_data[index] = homework[homeworkName]
          }
        })
        homeworkUploadStatus.value[studentName] = temp_data
      }

    } catch (error) {
      cleanJwt()
      router.push("/login")
      console.error('Failed to fetch homeworks:', error.message)
    }
  })

  const goToHomeworkCheck = (homeworkName, studentName) => {
      router.push({ name: 'HomeworkCheck', params: { name: homeworkName, student: studentName } })
  }

  const exportTableToExcel = (filename) => {
    var table = document.getElementById("homework-summary");
    console.log(table)
    var wb = utils.table_to_book(table, { sheet: "作业总表" });
    // 导出为Excel文件
    writeFile(wb, filename);
  }

  </script>