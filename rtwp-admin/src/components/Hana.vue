<template>
  <div class="card-deck mb-3">
    <div class="card">
      <div class="card-header">Top 10 Badge Locations</div>
      <div class="card-body">
        <div class="card-text">
          <i class="spinner-border text-primary" v-if="isBusy"></i>
          <l-map class="app-map" v-if="showMap" :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution" :options="tileOptions" />
            <l-image-overlay :url="floorMapUrl" :bounds="bounds"></l-image-overlay>
            <l-circle-marker v-for="(latLng, index) in latLngs" :key="index"
              :lat-lng="latLng"
              :radius="circle.radius"
              :color="circle.color"
              :fill-color="circle.fillColor"
            />
          </l-map>
          <b-table striped :items="data" responsive bordered ref="table" class="mt-2"></b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LCircleMarker, LImageOverlay } from 'vue2-leaflet'
import axios from 'axios'
import msgMixin from '../mixins/msg-mixin'

export default {
  name: 'AppHana',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LImageOverlay
  },
  mixins: [msgMixin],
  data() {
    return {
      data: [],
      latLngs: [],
      isBusy: false,
      showMap: false,
      circle: {
        radius: 6,
        color: 'yellow',
        fillColor: 'red'
      },
      zoom: 19,
      center: latLng(38.880251, -77.461093),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      tileOptions: {
        maxZoom: 22,
        maxNativeZoom:19
      },
      floorMapUrl: 'labs-map.png',
      bounds: [[38.880489357825475, -77.46145803208859], [38.880330280370940, -77.46106185592427]],
    }
  },
  methods: {
    // https://github.com/publiclab/Leaflet.DistortableImage
    getData() {
      this.isBusy = true
      const url = '/rtwp-api/hana/'
      axios
        .get(url)
        .then((res) => {
          this.data = res.data.results
          this.data.forEach((item) => {
            this.latLngs.push(item.geoLoc.coordinates.reverse())
          })
          this.showMap = true
        })
        .catch((err) => {
          console.error(err)
          this.errorMsg(err.message)
        })
        .finally(() => {
          this.isBusy = false
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style scoped>
.app-map {
  height: 500px;
}
</style>