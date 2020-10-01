<template>
  <div class="card">
    <div class="card-header">{{ data.length }} Most Reported Badge Locations</div>
    <div class="card-body">
      <div class="card-text">
        <i class="spinner-border text-primary" v-if="isBusy"></i>
        <l-map class="app-map" v-if="showMap" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution" :options="tileOptions" />
          <l-image-overlay :url="floorMapUrl" :bounds="bounds"></l-image-overlay>
          <l-circle-marker
            v-for="(item, index) in data"
            :key="index"
            :lat-lng="item.latLng"
            :radius="radius * (item.locCount / total)"
            :color="getColor(index)"
            :fill-color="getColor(index)"
            :fill-opacity="0.5"
          >
            <l-popup>{{item.locCount}} reports at this location</l-popup>
          </l-circle-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LCircleMarker, LImageOverlay, LPopup } from 'vue2-leaflet'
import axios from 'axios'
import msgMixin from '../mixins/msg-mixin'

export default {
  name: 'AppHana',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LImageOverlay,
    LPopup
  },
  mixins: [msgMixin],
  data() {
    return {
      data: [],
      isBusy: false,
      showMap: false,
      radius: 50,
      red: '#e55353',
      yellow: '#f9b115',
      blue: '#3399ff',
      zoom: 20,
      center: latLng(38.880481, -77.461193),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      tileOptions: {
        maxZoom: 22,
        maxNativeZoom: 19
      },
      bounds: [
        [38.88058, -77.46141],
        [38.88024, -77.461105]
      ],
      floorMapUrl: 'labs-map.png',
      total: 0
    }
  },
  methods: {
    getColor(index) {
      if (index < 0.33 * this.data.length) {
        return this.red
      } else if (index < 0.66 * this.data.length) {
        return this.yellow
      } else {
        return this.blue
      }
    },
    getData() {
      this.isBusy = true
      const url = '/rtwp-api/hana/'
      axios
        .get(url)
        .then((res) => {
          this.data = res.data.results
          this.data.forEach((item) => {
            item.latLng = item.geoLoc.coordinates.reverse()
            this.total += item.locCount
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
  height: 600px;
}
</style>