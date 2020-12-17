<template>
  <div class="card">
    <div class="card-header">
      <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i> Latest Visitors
      <i class="float-right cil-people"></i>
    </div>
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item" v-for="(item, index) in items" v-bind:key="index">
          <router-link :to="`/home/visitors/${item.id}`"
            >{{ item.visitorName }} - {{ item.last }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import msgMixin from '../mixins/msg-mixin'
import formatMixin from '../mixins/format-mixin'

export default {
  name: 'AppCardVisitors',
  mixins: [msgMixin, formatMixin],
  data() {
    return {
      isBusy: false,
      items: []
    }
  },
  methods: {
    getItems() {
      this.isBusy = true
      const url = '/rtwp-api/visitors'
      const options = {
        params: {
          limit: 5
        }
      }
      axios
        .get(url, options)
        .then(res => {
          this.items = res.data.results.map(item => {
            item.last = this.formatDate(item.last, 'L')
            item.start = this.formatDate(item.start, 'L')
            return item
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
    this.getItems()
  }
}
</script>
