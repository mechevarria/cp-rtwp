<template>
  <div class="card-deck">
    <div class="card">
      <div class="card-header">
        <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i> Visitors
        <i class="float-right cil-people"></i>
      </div>
      <div class="card-body">
        <b-table
          striped
          responsive
          bordered
          hover
          :items="getItems"
          :disabled="isBusy"
          :current-page="currentPage"
          :per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :fields="fields"
          @row-clicked="onRowClick"
          :tbody-tr-class="'app-pointer'"
        >
        </b-table>
        <div class="d-flex">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            :disabled="isBusy"
            :hide-goto-end-buttons="true"
            prev-text="Prev"
            next-text="Next"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import msgMixin from '../mixins/msg-mixin'
import formatMixin from '../mixins/format-mixin'

export default {
  name: 'AppVisitors',
  mixins: [msgMixin, formatMixin],
  data() {
    return {
      totalRows: 0,
      perPage: 10,
      currentPage: 1,
      start: 0,
      isBusy: false,
      sortBy: 'last',
      sortDesc: true,
      fields: [
        { key: 'id', sortable: false },
        { key: 'visitorName', sortable: true },
        { key: 'mobile', sortable: false },
        { key: 'start', sortable: true, label: 'Visit Start' },
        { key: 'last', sortable: true, label: 'Visit End' }
      ]
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({ path: `/home/visitors/${row.id}` })
    },
    getItems(ctx, callback) {
      this.isBusy = true
      const direction = ctx.sortDesc ? 'DESC' : 'ASC'

      const url = '/rtwp-api/visitors'
      const options = {
        params: {
          order: ctx.sortBy,
          limit: ctx.perPage,
          offset: ctx.currentPage - 1,
          direction
        }
      }
      axios
        .get(url, options)
        .then(res => {
          const items = res.data.results.map(item => {
            item.start = this.formatDate(item.start, 'lll')
            item.last = this.formatDate(item.last, 'lll')
            item.mobile = this.formatPhone(item.mobile)
            return item
          })
          this.totalRows = res.data.count
          callback(items)
        })
        .catch(err => {
          console.error(err)
          this.errorMsg(err.message)
          callback([])
        })
        .finally(() => {
          this.isBusy = false
        })
    },
    clear() {
      this.text = null
    }
  }
}
</script>
<style scoped>
.app-pointer {
  cursor: pointer;
}
</style>
