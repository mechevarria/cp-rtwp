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
      <app-card-stats></app-card-stats>
      <div class="card border-success">
        <div class="card-header">
          COVID Risk Status <i class="float-right cil-medical-cross"></i>
        </div>
        <div class="card-body text-center">
          <i class="c-icon c-icon-4xl cil-check mb-4"></i>
          <h3>100% low-risk responses / No - high-temp warnings</h3>
        </div>
      </div>
      <app-card-visitors></app-card-visitors>
    </div>
    <div class="card-deck mt-4">
      <app-map v-bind:show-form=false v-bind:class-name="'app-map-sm'"></app-map>
    </div>
    <div class="card-deck mt-4">
      <div class="card">
        <div class="card-header">Labs News <i class="float-right cil-newspaper"></i></div>
        <div class="card-body">
          <ul>
            <li>No scheduled fire alarm testing</li>
            <li>Temperature sensor installation was completed this week</li>
            <li>
              Labs will be closed on 05/02/2021 for
              <a href="https://sapns2.com/ns2now/" target="_blank">NS2 Now</a> filming
            </li>
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
import AppMap from './Map.vue'
import AppCardStats from './CardStats'
import AppCardVisitors from './CardVisitors'

export default {
  name: 'AppHome',
  components: {
    AppMap,
    AppCardStats,
    AppCardVisitors
  },
  computed: {
    fullName: function () {
      return this.$keycloak ? this.$keycloak.fullName : 'Guest'
    }
  },
  data() {
    return {}
  }
}
</script>
