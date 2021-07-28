import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {rutaProtegida: true}
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/Editar.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: ()=> import('../views/Registro.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: ()=> import('../views/Ingreso.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=> {//beforeeach hace un recorrido por cada una de nuestras rutas
  if(to.meta.rutaProtegida){//para todas las rutas que sean protegidas va a mandar true
    if(store.getters.usuarioAutenticado){//Si el usuraio es autenticado
      next();//Podemos acceder a la ruta protejida
    }
    else{
      next('/ingreso');//De lo contrario lo mandamos a ingreso
    }
  }
  else{
    next();//si la ruta no es protegida hacemos el next, que efectivamente vaya a esa ruta con seguridad
  }
})
export default router
