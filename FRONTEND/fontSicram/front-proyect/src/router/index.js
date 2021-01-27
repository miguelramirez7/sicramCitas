import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Error404 from '../components/Error404.vue'
// Importamos la tienda
import store from '../store/modules/login';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/pacientesystem',
        name: 'PacienteSistema',
        component: () =>
            import ( /* webpackChunkName: "PACIENTE" */ '../views/PacienteSistema.vue'),
            meta: {requireAuth: true}
    },
    {
        path: '/doctorsystem',
        name: 'DoctorSistema',
        component: () =>
            import ( /* webpackChunkName: "DOCTOR" */ '../views/DoctorSistema.vue'),
            meta: {requireAuth: true}
    },
    {
        path: '/orgsystem',
        name: 'OrganizacionSistema',
        component: () =>
            import ( /* webpackChunkName: "ORGANIZACION" */ '../views/OrganizacionSistema.vue'),
            meta: {requireAuth: true}
    },
    {
        path: '/pacientesystem/citapaciente/:id',
        name: 'CitaPaciente',
        component: () =>
            import ( /* webpackChunkName: "ORGANIZACION" */ '../views/CitaPaciente.vue'),
            meta: {requireAuth: true}
    },
    {
        path: '/doctorsystem/citadoctor/:id',
        name: 'CitaDoctor',
        component: () =>
            import ( /* webpackChunkName: "ORGANIZACION" */ '../views/CitaDoctor.vue'),
          
    },
    {
        path: '/prueba',
        name: 'Prueba',
        component: () =>
            import ( /* webpackChunkName: "ORGANIZACION" */ '../views/prueba.vue')
    },
    {
        path: '*',
        name: 'error404',
        component: Error404
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
  
    if(rutaProtegida && store.state.user === null){
      next({name: 'Home'})
  
    }else{
      next()
    }
  
})

export default router