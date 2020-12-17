<template>
  <span>
    <div class="card-deck mb-3">
      <div class="card">
        <div class="card-header">
          <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i>
          Visit Detail <i class="float-right cil-list"></i>
        </div>
        <div class="card-body">
          <form class="card-text">
            <div class="form-group">
              <label>ID</label>
              <input class="form-control form-control-sm" type="text" readonly v-model="data.id" />
            </div>
            <div class="form-group">
              <label>Visitor Name</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.visitorName"
              />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.email"
              />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.phone"
              />
            </div>
            <div class="form-group">
              <label>Company Name</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.companyName"
              />
            </div>
            <div class="form-group">
              <label>Address</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.address"
              />
            </div>
            <div class="form-group">
              <label>Visit Start</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.start"
              />
            </div>
            <div class="form-group">
              <label>Visit End</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.last"
              />
            </div>
            <div class="form-group">
              <label>Last Modified</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.lastModification"
              />
            </div>
            <div class="form-group">
              <label>Device ID</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.deviceId"
              />
            </div>
            <div class="form-group">
              <label>Readable Device ID</label>
              <input
                class="form-control form-control-sm"
                type="text"
                readonly
                v-model="data.readableDeviceId"
              />
            </div>
          </form>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i>
          Visitor Picture <i class="float-right cil-camera"></i>
        </div>
        <div class="card-body text-center">
          <img :src="data.imageUrl" alt="Visitor Picture" class="img-fluid" />
        </div>
      </div>
    </div>
    <div class="card-deck mb-3">
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
    </div>
  </span>
</template>
<script>
import { latLng, icon } from 'leaflet'
import msgMixin from '../mixins/msg-mixin'
import formatMixin from '../mixins/format-mixin'
import { LMap, LTileLayer, LImageOverlay, LMarker, LPolyline } from 'vue2-leaflet'
import axios from 'axios'

export default {
  name: 'AppDetail',
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
      data: {},
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
    getData() {
      this.isBusy = true
      const url = '/rtwp-api/visitor'
      const options = {
        params: {
          id: this.$route.params.id
        }
      }
      axios
        .get(url, options)
        .then(res => {
          this.data = res.data.result
          this.data.last = this.formatDate(this.data.last, 'lll')
          this.data.lastTs = this.formatDate(this.data.last, 'YYYY-MM-DD HH:mm:ss')
          this.data.start = this.formatDate(this.data.start, 'lll')
          this.data.startTs = this.formatDate(this.data.start, 'YYYY-MM-DD HH:mm:ss')
          this.data.lastModification = this.formatDate(this.data.lastModification, 'lll')
          this.data.mobile = this.formatPhone(this.data.mobile)
        })
        .catch(err => {
          console.error(err)
          this.errorMsg(err.message)
        })
        .finally(() => {
          this.isBusy = false
        })
    },
    recurseLoc(locations) {
      if (locations.length === 0) {
        return
      } else {
        this.latLngs.push(locations[0].latLng)
        this.currentLoc = locations[0].latLng
        this.currentTime = locations[0].seen
        locations.shift()
        setTimeout(() => {
          this.recurseLoc(locations)
        }, 2)
      }
    },
    getMapData() {
      this.isBusy = true
      this.latLngs = []
      const url = '/rtwp-api/visitor/map'
      const options = {
        params: {
          device: this.data.deviceId,
          start: this.data.startTs,
          end: this.data.lastTs
        }
      }
      axios
        .get(url, options)
        .then(res => {
          if (res.data.results.length === 0) {
            this.infoMsg('No location data found for this visit')
          }
          if(res.data.results.length === 10000) {
            this.infoMsg('Record limit of 10000 reached')
          }
          this.locations = res.data.results.map(result => {
            const split = result.location.split('&')
            result.latLng = latLng(split[1], split[0])
            return result
          })
          this.recurseLoc(this.locations)
        })
        .catch(err => {
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
  height: 400px;
}
</style>
