<template>
  <div class="card">
    <div class="card-header">
      <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i>
      Visitor Map <i class="float-right cil-map"></i>
    </div>
    <div class="card-body">
      <button class="btn btn-primary mb-3 mr-2" :disabled="isBusy" @click="getMapData">
        Replay
      </button>
      <button class="btn btn-secondary mb-3 mr-2" :disabled="isBusy" @click="clear">
        Clear
      </button>
      <span class="text-muted float-right">{{ currentTime }}</span>
      <l-map class="app-map" :zoom="zoom" :center="center" :options="mapOptions">
        <l-tile-layer :url="url" :attribution="attribution" :options="tileOptions" />
        <l-image-overlay :url="floorMapUrl" :bounds="bounds"></l-image-overlay>
        <l-polyline :lat-lngs="latLngs" :color="lineColor"></l-polyline>
        <l-marker v-if="currentLoc" :lat-lng="currentLoc" :icon="userIcon"></l-marker>
      </l-map>
    </div>
  </div>
</template>
<script>
import { latLng, icon } from 'leaflet'
import { LMap, LTileLayer, LImageOverlay, LMarker, LPolyline } from 'vue2-leaflet'
import axios from 'axios'
import msgMixin from '../mixins/msg-mixin'
import formatMixin from '../mixins/format-mixin'

export default {
  name: 'AppDetailMap',
  props: ['deviceId', 'startTs', 'lastTs'],
  components: {
    LMap,
    LTileLayer,
    LImageOverlay,
    LPolyline,
    LMarker
  },
  mixins: [msgMixin, formatMixin],
  data() {
    return {
      isBusy: false,
      latLngs: [],
      locations: [],
      zoom: 20,
      center: latLng(38.880411, -77.461193),
      mapOptions: {
        zoomControl: false,
        scrollWheelZoom: false
      },
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
      floorMapUrl: '/img/labs-map.png',
      lineColor: '#321fdb',
      currentTime: '',
      userIcon: icon({
        iconUrl: '/img/marker-danger.svg',
        iconSize: [21, 21],
        iconAnchor: [11, 17]
      }),
      currentLoc: null
    }
  },
  methods: {
    clear() {
      this.locations = []
      this.latLngs = []
      this.currentTime = ''
      this.currentLoc = null
    },
    recurseLoc() {
      if (this.locations.length === 0) {
        return
      } else {
        // don't push repeat values
        if (
          !(this.latLngs.length > 1 && this.latLngs.slice(-1)[0].equals(this.locations[0].latLng))
        ) {
          this.latLngs.push(this.locations[0].latLng)
          this.currentLoc = this.locations[0].latLng
          this.currentTime = this.formatDate(this.locations[0].seen, 'YYYY-MM-DD HH:mm:ss')
        }
        this.locations.shift()
        setTimeout(() => {
          this.recurseLoc(this.locations)
        }, 2)
      }
    },
    getMapData() {
      this.isBusy = true
      this.latLngs = []
      const url = '/rtwp-api/visitor/map'
      const options = {
        params: {
          device: this.deviceId,
          start: this.startTs,
          end: this.lastTs
        }
      }
      axios
        .get(url, options)
        .then(res => {
          if (res.data.results.length === 0) {
            this.infoMsg('No location data found for this visit')
          }
          if (res.data.results.length === 10000) {
            this.infoMsg('Record limit of 10000 reached')
          }
          this.locations = res.data.results.map(result => {
            const split = result.location.split('&')
            result.latLng = latLng(split[1], split[0])
            return result
          })
          this.recurseLoc()
        })
        .catch(err => {
          console.error(err)
          this.errorMsg(err.message)
        })
        .finally(() => {
          this.isBusy = false
        })
    }
  }
}
</script>
<style scoped>
.app-map {
  height: 400px;
}
</style>
