import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from './components/Home.vue'
import AppForm from './components/Form.vue'
import AppHana from './components/Hana.vue'
import AppStatus from './components/Status.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: AppHome,
    name: 'Home'
}, {
    path: '/form',
    component: AppForm,
    name: 'Form'
}, {
    path: '/hana',
    component: AppHana,
    name: 'Hana'
}, {
    path: '/status',
    component: AppStatus,
    name: 'Status'
}, {
    path: '*',
    redirect: '/'
}]

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    linkActiveClass: 'c-sidebar-nav-link-primary'
})

export default router