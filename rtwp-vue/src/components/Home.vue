<template>
  <span>
    <div class="card-deck">
      <div class="card">
        <div class="card-body">
          <a target="_blank" href="https://sapns2.com/labs/" title="NS2 Labs">
            <img
              src="../assets/ns2-labs-horizontal.png"
              height="50"
              alt="NS2 Labs logo"
              class="mb-2"
            />
          </a>
          <h4 class="card-title">Welcome {{ fullName }}</h4>
          <div class="card-text">
            <l-map
              class="app-map"
              v-if="showMap"
              :zoom="zoom"
              :center="center"
              :options="mapOptions"
            >
              <l-tile-layer :url="url" :attribution="attribution" />
            </l-map>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </span>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'

export default {
  name: 'AppHome',
  components: {
    LMap,
    LTileLayer
  },
  computed: {
    fullName: function () {
      return this.$keycloak ? this.$keycloak.fullName : 'Guest'
    }
  },
  data() {
    return {
      zoom: 20,
      center: latLng(38.880371, -77.461093),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    }
  }
}
</script>
<style scoped>
.app-map {
  height: 500px;
}
</style>