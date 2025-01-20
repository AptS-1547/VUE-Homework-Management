<template>
    <MessageInfo ref="messageInfo" />
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
                    <h3 class="text-lg font-semibold text-gray-900">目前正在查看 {{studentName}} 的 {{ homeworkName }} 作业</h3>
                    <div class="mt-2 max-w-xl text-base text-gray-500">
                        <p>请老师在页面下方进行评价</p>
                    </div>
                </div>

                <div class="px-4 py-4 mt-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:p-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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

                <div class="px-4 py-4 sm:p-6 mt-auto">
                    <label for="text" class="block sm:text-lg font-semibold text-gray-900">学生批注</label>
                    <div class="mt-3">
                        <div class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-black outline-gray-200 sm:text-base">
                            {{ homeworkData.comment }}
                        </div>
                    </div>
                    <label for="text" class="mt-3 block sm:text-lg font-semibold text-gray-900">老师评价</label>
                    <div class="mt-3">
                        <input v-model="reply" type="text" name="text" id="text" class="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="请老师在此处写下评价" />
                        <input @click="handleReply" :disabled="isSubmitting" type="submit" value="提交评价" class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
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
  import MessageInfo from '@/components/MessageInfo.vue'
  import { cleanJwt } from '../utils/auth';
  import { getTeacherHomework } from '../api/homework';
  import { replyHomework } from '../api/upload';

  const route = useRoute()
  const router = useRouter()
  const homeworkName = ref(route.params.name)
  const studentName = ref(route.params.student)
  const homeworkData = ref({})
  const reply = ref('')
  
  const isSubmitting = ref(false)

  const messageInfo = ref(null)



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
        const data = await getTeacherHomework({ student: studentName.value, homework: homeworkName.value })
        homeworkData.value = data.homework_data

        if (homeworkData.value.comment === "") {
            homeworkData.value.comment = "学生没有批注哦"
        }

        if (homeworkData.value.teacher_reply === "") {
            reply.value = ""
        } else {
            reply.value = homeworkData.value.teacher_reply
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

    const handleReply = async () => {
        try {
        isSubmitting.value = true
        messageInfo.value.setMessage('评价中……', 'info')
        const response = await replyHomework(studentName.value, homeworkName.value, reply.value)

        if (response.code === 0) {
            messageInfo.value.setMessage('评价成功', 'success')
            setTimeout(() => {
                router.push('/')
            }, 1000)
        } else {
            messageInfo.value.setMessage('评价失败', 'error')
            isSubmitting.value = false
        }
        } catch (error) {
        isSubmitting.value = false
        console.error('Failed to reply:', error.message)
        messageInfo.value.setMessage('评价失败', 'error')
        }
    }

</script>