<template>
  <span>
    <div class="card-deck">
      <div class="card">
        <div class="card-header">User <i class="float-right cil-home"></i></div>
        <div class="card-body text-center">
          <a target="_blank" href="https://sapns2.com/labs/" title="NS2 Labs">
            <img
              src="../assets/ns2-labs-horizontal.png"
              width="100%"
              alt="NS2 Labs logo"
              class="mb-2"
            />
          </a>
          <h3 class="card-title">Welcome {{ fullName }}</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-header">Usage Map <i class="float-right cil-map"></i></div>
        <div class="card-body">
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
      <div class="card border-success">
        <div class="card-header">
          COVID Risk Status <i class="float-right cil-medical-cross"></i>
        </div>
        <div class="card-body text-center">
          <i class="c-icon c-icon-4xl cil-check mb-4"></i>
          <h3>100% low-risk responses / No - high-temp warnings</h3>
        </div>
      </div>
    </div>
    <div class="card-deck mt-2">
      <div class="card">
        <div class="card-header">Lab News <i class="float-right cil-newspaper"></i></div>
        <div class="card-body">
          <ul>
            <li>No scheduled fire alarm testing</li>
            <li>Temperature sensor installation was completed this week</li>
            <li>Labs will be closed on 10/02/2020 for NS2 Now filming</li>
          </ul>
        </div>
      </div>
      <div class="card">
        <div class="card-header">Statistics <i class="float-right cil-chart-pie"></i></div>
        <div class="card-body">
          <ul class="list-inline">
            <li>
              <highcharts :options="chartOptions"></highcharts>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-deck mt-2">
      <div class="card">
        <div class="card-header">Todays Visitors <i class="float-right cil-people"></i></div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item"><a href>Kyle Rice</a></li>
            <li class="list-group-item"><a href>Jay Bougie</a></li>
            <li class="list-group-item"><a href>Michael Towles</a></li>
            <li class="list-group-item"><a href>Tunisha Holloway</a></li>
          </ul>
        </div>
      </div>
      <div class="card">
        <div class="card-header">Schedule of Events <i class="float-right cil-calendar"></i></div>
        <div class="card-body text-center">
          <b-calendar locale="en-US"></b-calendar>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </span>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'
import { Chart } from 'highcharts-vue'

export default {
  name: 'AppHome',
  components: {
    LMap,
    LTileLayer,
    highcharts: Chart
  },
  computed: {
    fullName: function () {
      return this.$keycloak ? this.$keycloak.fullName : 'Guest'
    }
  },
  data() {
    return {
      zoom: 20,
      center: latLng(38.880251, -77.461093),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      chartOptions: {
        chart: {
          type: 'pie',
          height: '200px'
        },
        title: {
          text: 'Visitor Metrics'
        },
        series: [
          {
            data: [
              {
                y: 60,
                name: 'Scheduled'
              },
              {
                y: 40,
                name: 'Ad-hoc'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
<style scoped>
.app-map {
  height: 200px;
}
</style>