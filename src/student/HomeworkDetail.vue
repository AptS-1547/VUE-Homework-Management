<template>
    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ homeworkName }}</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="bg-white shadow-sm sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-base font-semibold text-gray-900">本作业已经完成上传！</h3>
                    <div class="mt-2 max-w-xl text-sm text-gray-500">
                        <p>你可以在此处查看你上传的作业与老师评价</p>
                    </div>
                </div>

                <div class="px-4 py-5 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:p-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <div v-for="image in homeworkData.file" :key="image.name" class="group relative" @click="openModal(image.src)">
                        <img :src="image.src" alt="" class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 cursor-pointer" />
                        <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0" />
                                {{ image.name }}
                            </h3>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="px-4 py-5 sm:p-6">
                    <label for="text" class="block sm:text-base font-semibold text-gray-900">学生批注</label>
                    <div class="mt-3">
                        <div class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-black outline-gray-200 sm:text-base">
                            {{ homeworkData.comment }}
                        </div>
                    </div>
                    <label for="text" class="mt-3 block sm:text-base font-semibold text-gray-900">老师评价</label>
                    <div class="mt-3">
                        <div class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-black outline-gray-200 sm:text-base">
                            {{ homeworkData.teacher_reply }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>

    <!-- 模态框 -->
    <div @click="closeModal" v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded-lg">
        <img :src="modalImageSrc" alt="放大图片" class="max-w-full max-h-full" />
        <button @click="closeModal" class="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">关闭</button>
      </div>
    </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { cleanJwt } from '@/utils/auth';
  import { getStudentHomework } from '@/api/homework.js'

  const route = useRoute()
  const router = useRouter()
  const homeworkName = ref(route.params.name)
  const homeworks = ref({ homework_data: {} })
  const homeworkData = ref({})

  // 模态框相关状态
  const isModalOpen = ref(false)
  const modalImageSrc = ref('')

  const openModal = (src) => {
    modalImageSrc.value = src
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
  }

  onMounted(async () => {
    try {
        const data = await getStudentHomework()
        homeworkData.value = data.homework_data[homeworkName.value]

        if (homeworkData.value.comment === "") {
            homeworkData.value.comment = "你没有写批注哦"
        }

        if (homeworkData.value.teacher_reply === "") {
            homeworkData.value.teacher_reply = "老师还没有评价哦"
        }

        homeworkData.value.file = homeworkData.value.file.map((file) => {
            return {
                name: file,
                href: `${import.meta.env.VITE_APP_API_URL}/uploads/${homeworkName.value}/${file}`,
                src: `${import.meta.env.VITE_APP_API_URL}/uploads/${homeworkName.value}/${file}`
            }
        })

    } catch (error) {
        cleanJwt()
        router.push("/login")
        console.error('Failed to fetch homeworks:', error.message)
    }
 })
</script>