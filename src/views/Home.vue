<template>
  <div>
    <main>
      <component :is="dynamicComponent" />
    </main>
  </div>
</template>

<script setup>
import { shallowRef, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getUserRole, isLogin } from '@/utils/auth'
import HomeworkView from '@/student/HomeworkView.vue'
import HomeworkOverview from '@/teacher/HomeworkOverview.vue'

const dynamicComponent = shallowRef(null)
const route = useRoute()

onMounted(() => {
  const role = getUserRole()
  if (role === 'classrep' && route.name === 'AllUploadsView') {
    dynamicComponent.value = HomeworkOverview
  } else if (role === 'student' || role === 'classrep') {
    dynamicComponent.value = HomeworkView
  } else if (role === 'teacher') {
    dynamicComponent.value = HomeworkOverview
  } else if (!isLogin()) {
    window.location.href = '/login'
  } else {
    window.location.href = '/404'
  }
})
</script>