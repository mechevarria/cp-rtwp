<template>
  <div class="card-deck mb-3">
    <div class="card">
      <div class="card-header">
        <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i>
        Visit Detail
      </div>
      <div class="card-body">
        <p class="card-text"><pre>{{ data }}</pre></p>
      </div>
    </div>
  </div>
</template>
<script>
import msgMixin from '../mixins/msg-mixin'
import axios from 'axios'

export default {
  name: 'AppDetail',
  mixins: [msgMixin],
  data() {
    return {
      data: null,
      isBusy: false
    }
  },
  methods: {
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