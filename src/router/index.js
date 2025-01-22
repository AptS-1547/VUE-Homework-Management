import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Homeworks from '@/views/Homeworks.vue'
import NotFound from '@/views/NotFound.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'HomeView', component: Home },                             // 默认界面，学生和课代表展示自己所有的作业，教师展示同学所有已经提交的作业
  { path: '/login', name: "LoginView", component: Login },                      // 登录界面
  { path: '/about', name: 'AboutView', component: About },                     // 关于界面
  { path: '/homework', name: 'AllUploadsView', component: Home },               // 课代表、教师展示所有已经提交的作业
  { path: '/homework/upload/:name', name: 'HomeworkUpload', component: Homeworks },
  { path: '/homework/detail/:name', name: 'HomeworkDetail', component: Homeworks },
  { path: '/homework/check/:student/:name', name: 'HomeworkCheck', component: Homeworks},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router