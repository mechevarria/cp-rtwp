import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from './components/Home.vue'
import AppVisitors from './components/Visitors.vue'
import AppHana from './components/Map.vue'
import AppStatus from './components/Status.vue'
import AppAbout from './components/About.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    component: AppHome,
    name: 'Home'
}, {
    path: '/home/visitors',
    component: AppVisitors,
    name: 'Visitors'
}, {
    path: '/home/map',
    component: AppHana,
    name: 'Map'
}, {
    path: '/home/about',
    component: AppAbout,
    name: 'About'
}, {
    path: '/home/status',
    component: AppStatus,
    name: 'Status'
}, {
    path: '*',
    redirect: '/home'
}]

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    linkActiveClass: 'c-sidebar-nav-link-primary'
})

export default router