<template>
  <span>
    <div class="card-deck">
      <div class="card text-white bg-primary">
        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
          <div>
            <div class="text-value-lg">
              <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i>
              {{ start.hour }}
            </div>
            <div class="mb-2">Most popular start hour</div>
          </div>
          <div>
            <i class="cil-media-play mr-2"></i>
            <i class="cil-clock"></i>
          </div>
        </div>
      </div>
      <div class="card text-white bg-info">
        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
          <div>
            <div class="text-value-lg">
              <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i>
              {{ last.hour }}
            </div>
            <div class="mb-2">Most popular end hour</div>
          </div>
          <div>
            <i class="cil-media-stop mr-2"></i>
            <i class="cil-clock"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="card-deck mt-4">
      <div class="card">
        <div class="card-header">
          <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i> Visits Longer Than one
          Day
          <i class="float-right cil-av-timer"></i>
        </div>
        <div class="card-body">
          <b-table
            striped
            responsive
            bordered
            hover
            :items="visitDiffs"
            :disabled="isBusy"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            @row-clicked="onRowClick"
            :tbody-tr-class="'app-pointer'"
          ></b-table>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i> Visit Lengths By Hour
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
    </div>
    <div id="editor" ref="editor">SAC HERE</div>
    <!-- <div 
      id="iframe-wrapper"
      :style="iframe.wrapperStyle" 
    > -->
    <div 
      id="iframe-wrapper"
    >
        <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/M2kSJbLbIgQ" frameborder="0" allowfullscreen></iframe>  -->
        <iframe width="560" height="315" src="https://oidsr44e6zfcs2ucrpdelht.us10.sac.ondemand.com/sap/fpa/ui/tenants/71e4c/bo/story/4F6973040B65B9BAD132645019AC1687?mode=embed" frameborder="0" allowfullscreen></iframe> 
      <!-- <iframe 
        v-if="loaded"
        :src="iframe.src"
        :style="iframe.style"
        :height="iframe.style.height"
        :width="iframe.style.width"
      
        frameborder="0"
      ></iframe> -->
    </div>
    
  </span>
</template>
<script>
import { Chart } from 'highcharts-vue'
import msgMixin from '../mixins/msg-mixin'
import axios from 'axios'

export default {
  name: 'AppStats',components: {
    highcharts: Chart
  },
  mixins: [msgMixin],
  data() {
    return {
      isBusy: false,
      start: {},
      last: {},
      visitDiffs: [],
      visitLengths: [],
      sortBy: 'numDays',
      sortDesc: true,
      chartOptions: {
        chart: {
          type: 'pie',
          height: '300px'
        },
        title: {
          text: 'Visit Length By Hour'
        },
        series: [
          {
            data: []
          }
        ]
      },
    //   iframe: {
    //     //   https://<yourSACtenantURI>/sap/fpa/ui/tenants/<yourTenantID>/bo/story/<yourStoryID>?<Parameters>
    //     // src: 'https://oidsr44e6zfcs2ucrpdelht.us10.sac.ondemand.com/sap/fpa/ui/tenants/71e4c/bo/story/4F6973040B65B9BAD132645019AC1687?mode=embed'
    //     src: 'https://www.youtube.com/embed/owsfdh4gxyc'
    //   }

    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({ path: `/home/visitors/${row.id}` })
    },
    getData() {
      this.isBusy = true
      axios
        .all([
          axios.get('/rtwp-api/date/start'),
          axios.get('/rtwp-api/date/last'),
          axios.get('/rtwp-api/date/diff'),
          axios.get('/rtwp-api/visitor/length')
        ])
        .then(
          axios.spread((startRes, lastRes, diffRes, lengthRes) => {
            this.start = startRes.data.result
            this.last = lastRes.data.result
            this.visitDiffs = diffRes.data.results
            this.chartOptions.series[0].data = lengthRes.data.results.map((result) => {
                result.y = result.count
                result.name = `${result.length} hour(s)`
                return result
            })
          })
        )
        .catch(err => {
          console.error(err)
          this.errMsg(err.message)
        })
        .finally(() => {
          this.isBusy = false
        })
    }
  },
  created() {
    this.getData()
  }
//    mounted() {
//     let editor = this.$refs.editor;
//     this.iframe.style = {
//       position: 'absolute',
//       width: window.innerWidth,
//       height: window.innerHeight,
//       top: -editor.offsetTop + 'px',
//       left: -editor.offsetLeft + 'px',
//     }    
//     this.iframe.wrapperStyle = {
//       overflow: 'hidden',
//       height: editor.clientHeight + 'px',
//       width: editor.clientWidth + 'px',
//     } 
//     this.loaded = true;
//   }
}
</script>
<style scoped>
.app-pointer {
  cursor: pointer;
}
</style>
