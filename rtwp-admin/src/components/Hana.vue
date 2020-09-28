<template>
  <div class="card-deck mb-3">
    <div class="card">
      <div class="card-header">Hana Tables</div>
      <div class="card-body">
        <div class="card-text">
          <i class="spinner-border text-primary" v-if="isBusy"></i>
          <p v-if="count > 0"> {{ count }} total tables </p>
          <b-table striped :items="data" responsive bordered ref="table"></b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import msgMixin from '../mixins/msg-mixin'

export default {
  name: 'AppHana',
  mixins: [msgMixin],
  data() {
    return {
      data: [],
      count: 0,
      isBusy: false
    }
  },
  methods: {
    getData() {
      this.isBusy = true
      const url = '/btwp-api/hana/'
      axios
        .get(url)
        .then((res) => {
          this.data = res.data.data
          this.count = this.data.length
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