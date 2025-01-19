import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Homeworks from '../views/Homeworks.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', name: 'HomeworkView', component: Home },
  { path: '/login', name: "LoginView", component: Login },
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