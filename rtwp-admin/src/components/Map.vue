<template>
  <div class="card">
    <div class="card-header">
      <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i> Labs Map
    </div>
    <div class="card-body">
      <div class="card-text">
        <form v-if="showForm">
          <div class="row">
            <div class="form-group col-sm-6">
              <label>Start Date</label>
              <b-form-datepicker id="start-datepicker" v-model="start"></b-form-datepicker>
            </div>
            <div class="form-group col-sm-6">
              <label>End Date</label>
              <b-form-datepicker id="end-datepicker" v-model="end"></b-form-datepicker>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-sm btn-primary mb-2"
            @click="getData()"
            :disabled="isBusy"
          >
            <i class="cil-reload btn-icon mr-1"></i>Refresh
          </button>
        </form>

        <l-map class="app-map" v-if="showMap" :zoom="zoom" :center="center" :options="mapOptions">
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
            <l-popup>{{ item.locCount }} reports at this location</l-popup>
          </l-circle-marker>
        </l-map>
      </div>
    </div>
    <div class="card-footer">
      {{ data.length }} Most Reported Badge Locations
      <span class="text-muted float-right" v-if="showMap">
        {{ stats.count }} reports between {{ stats.min.substring(0, 19) }} and
        {{ stats.max.substring(0, 19) }}
      </span>
    </div>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LCircleMarker, LImageOverlay, LPopup } from 'vue2-leaflet'
import axios from 'axios'
import msgMixin from '../mixins/msg-mixin'

export default {
  name: 'AppMap',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LImageOverlay,
    LPopup
  },
  mixins: [msgMixin],
  props: {
    showForm: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      data: null,
      start: null,
      end: null,
      isBusy: false,
      showMap: false,
      radius: 50,
      red: '#e55353',
      yellow: '#f9b115',
      blue: '#3399ff',
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
      total: null,
      stats: null
    }
  },
  methods: {
    clear() {
      this.stats = {
        count: 0,
        min: '',
        max: ''
      },
      this.data = [],
      this.total = 0
    },
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
      this.clear()
      this.isBusy = true
      const options = {
        params: {
          start: this.start,
          end: this.end
        }
      }
      axios
        .all([axios.get('/rtwp-api/map', options), axios.get('/rtwp-api/count', options)])
        .then(
          axios.spread((res1, res2) => {
            if (res1.data.results.length > 0 && res2.data.result.count > 0) {
              this.data = res1.data.results
              this.stats = res2.data.result
              this.data.forEach(item => {
                item.latLng = item.geoLoc.coordinates.reverse()
                this.total += item.locCount
              })
            } else {
              this.infoMsg(`No reports between ${this.start} and ${this.end}`)
            }
          })
        )
        .catch(err => {
          console.error(err)
          this.errorMsg(err.message)
        })
        .finally(() => {
          this.isBusy = false
          this.showMap = true
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
