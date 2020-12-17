<template>
  <div class="card">
    <div class="card-header">
      <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i> Statistics
      <i class="float-right cil-chart-pie"></i>
    </div>
    <div class="card-body">
      <ul class="list-inline">
        <li>
          <highcharts :options="chartOptions"></highcharts>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Chart } from 'highcharts-vue'
import axios from 'axios'

export default {
  name: 'AppCardStats',
  components: {
    highcharts: Chart
  },
  data() {
    return {
      isBusy: false,
      chartOptions: {
        chart: {
          type: 'pie',
          height: '250px'
        },
        title: {
          text: 'Visitors By Month'
        },
        series: [
          {
            data: []
          }
        ]
      }
    }
  },
  methods: {
    getData() {
      this.isBusy = true
      const url = '/rtwp-api/stats'
      axios
        .get(url)
        .then(res => {
          this.chartOptions.series[0].data = res.data.results.map(result => {
            if (result.name == null) {
              result.name = 'Unknown'
            }
            return result
          })
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
