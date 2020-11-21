import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pacientesystem',
    name: 'PacienteSistema',
    component: () => import(/* webpackChunkName: "PACIENTE" */ '../views/PacienteSistema.vue')
  },
  {
    path: '/doctorsystem',
    name: 'DoctorSistema',
    component: () => import(/* webpackChunkName: "DOCTOR" */ '../views/DoctorSistema.vue')
  },
  {
    path: '/orgsystem',
    name: 'OrganizacionSistema',
    component: () => import(/* webpackChunkName: "ORGANIZACION" */ '../views/OrganizacionSistema.vue')
  },
  {
    path: '/prueba',
    name: 'Prueba',
    component: () => import(/* webpackChunkName: "ORGANIZACION" */ '../views/prueba.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
