import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/Editar.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: ()=> import('../views/Registro.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
