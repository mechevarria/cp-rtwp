import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from './components/Home.vue'
import AppVisitors from './components/Visitors.vue'
import AppHana from './components/Map.vue'
import AppAbout from './components/About.vue'
import AppDetail from './components/Detail.vue'
import AppStats from './components/Stats.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    component: AppHome,
    name: 'home'
}, {
    path: '/home/visitors',
    component: AppVisitors,
    name: 'visitors'
}, {
    path: '/home/visitors/:id',
    component: AppDetail
}, {
    path: '/home/map',
    component: AppHana,
    name: 'map'
}, {
    path: '/home/stats',
    component: AppStats,
    name: 'statistics'
}, {
    path: '/home/about',
    component: AppAbout,
    name: 'about'
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