<template>
    <MessageInfo ref="messageInfo" />
    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ homeworkName }}</h1>
          <p class="mt-1 text-lg text-gray-500">{{ homeworkContent }}</p>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="bg-white shadow-sm sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-base font-semibold text-gray-900">请在这里上传你的作业</h3>
                    <div class="mt-2 max-w-xl text-sm text-gray-500">
                        <p>请上传你的作业，然后点击提交按钮。</p>
                    </div>
                    <form class="mt-5 sm:flex sm:items-center" @submit.prevent="handleUpload">
                        <div class="w-full sm:max-w-xs">
                            <input type="file" name="file" id="file" aria-label="File" class="border border-solid border-zinc-200 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" multiple required accept=".png,.jpg,.jpeg,.gif,.pdf,.txt,.md" />
                            <input type="text" name="comment" id="comment" aria-label="comment" class="mt-3 border border-solid border-zinc-200 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="批注" />
                            <button :disabled="isSubmitting" type="submit" class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm/6">提交</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { getStudentHomework } from '@/api/homework'
  import { uploadHomework } from '@/api/upload'
  import MessageInfo from '@/components/MessageInfo.vue'

  const route = useRoute()
  const router = useRouter()
  const homeworkName = ref(route.params.name)
  const homeworkContent = ref('本作业没有描述')

  const isSubmitting = ref(false)

  const messageInfo = ref(null)

  onMounted(async () => {
    try {
      const data = await getStudentHomework({homework: homeworkName.value})
      if (data.homework_data.content !== "") {
        homeworkContent.value = data.homework_data.content
      }
    } catch (error) {
      console.error('Failed to fetch homework:', error.message)
    }
  })

  const handleUpload = async () => {
    try {
      const fileInput = document.getElementById('file')
      const files = fileInput.files
      const commentValue = comment.value

      if (files.length === 0) {
        messageInfo.value.setMessage('请至少上传一个文件', 'error')
        isSubmitting.value = false
        return
      }

      messageInfo.value.setMessage('提交作业中……', 'info')
      const response = await uploadHomework(homeworkName.value, commentValue, files)
      isSubmitting.value = true

      if (response.code === 0) {
        messageInfo.value.setMessage('作业提交成功', 'success')
        setTimeout(() => {
            router.push('/')
        }, 1000)
      } else {
        messageInfo.value.setMessage('作业提交失败', 'error')
        isSubmitting.value = false
      }
    } catch (error) {
      console.error('Failed to upload homework:', error.message)
      messageInfo.value.setMessage('作业提交失败', 'error')
    }
  }


  </script>