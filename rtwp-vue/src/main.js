import Vue from 'vue'
import App from './App.vue'
import { NavPlugin, DropdownPlugin, ToastPlugin, TablePlugin, PaginationPlugin, FormSelectPlugin } from 'bootstrap-vue'
import VueMobileDetection from 'vue-mobile-detection'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import 'perfect-scrollbar/dist/perfect-scrollbar'
import axios from 'axios'
import '@popperjs/core/dist/esm/popper'
import router from './app-router'
import store from './app-store'

Vue.config.productionTip = false

Vue.use(NavPlugin)
Vue.use(DropdownPlugin)
Vue.use(ToastPlugin)
Vue.use(TablePlugin)
Vue.use(PaginationPlugin)
Vue.use(FormSelectPlugin)
Vue.use(VueMobileDetection)

function tokenInterceptor() {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
    return config
  }, error => {
    return Promise.reject(error)
  })
}

if (window._env.keycloak.enabled === 'true') {
  console.log('keycloak is enabled')

  Vue.use(VueKeyCloak, {
    config: {
      realm: window._env.keycloak.realm,
      url: window._env.keycloak.url,
      clientId: window._env.keycloak.id
    },
    init: {
      onLoad: 'login-required',
      checkLoginIframe: false
    },
    onReady: () => {
      tokenInterceptor()
      new Vue({
        render: h => h(App),
        router,
        store
      }).$mount('#app')
    }
  })
  
} else {

  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')

}
