import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from './components/Home.vue'
import AppVisitors from './components/Visitors.vue'
import AppHana from './components/Hana.vue'
import AppStatus from './components/Status.vue'
import AppAbout from './components/About.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: AppHome,
    name: 'Home'
}, {
    path: '/visitors',
    component: AppVisitors,
    name: 'Visitors'
}, {
    path: '/hana',
    component: AppHana,
    name: 'Hana'
}, {
    path: '/about',
    component: AppAbout,
    name: 'About'
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