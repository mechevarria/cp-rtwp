<template>
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
</template>
<script>
import { Chart } from 'highcharts-vue'

export default {
  name: 'AppCardStats',
  components: {
    highcharts: Chart
  },
  data() {
    return {
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
                name: 'Scheduled',
                color: '#321fdb'
              },
              {
                y: 40,
                name: 'Ad-hoc',
                color: '#3399ff'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
