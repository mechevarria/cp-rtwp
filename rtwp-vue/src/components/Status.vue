<template>
  <div class="card-deck">
    <div class="card">
      <div class="card-header">Api Status</div>
      <form class="card-text" @submit.prevent="handleSubmit">
        <div class="card-body">
          <div class="form-group">
            <label>Name</label>
            <input v-model="text" type="text" class="form-control" />
          </div>
        </div>
        <div class="card-footer">
          <button
            type="submit"
            class="btn btn-sm btn-primary mr-1"
            :disabled="isBusy"
          >
            <i class="cil-check-circle btn-icon mr-1" v-if="!isBusy"></i>
            <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i
            >Submit
          </button>
          <button
            type="button"
            class="btn btn-sm btn-danger"
            @click="clear"
            :disabled="isBusy"
          >
            <i class="cil-x-circle btn-icon mr-1"></i>Clear
          </button>
        </div>
      </form>
    </div>
    <div class="card">
      <div class="card-header">Response</div>
      <div class="card-body">
        <pre>{{ data }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import msgMixin from '../mixins/msg-mixin'

export default {
  name: 'AppStatus',
  mixins: [msgMixin],
  data() {
    return {
      text: null,
      data: {},
      type: 'success',
      isBusy: false
    }
  },
  methods: {
    handleSubmit() {
      this.isBusy = true
      const options = {
        params: {
          text: this.text
        }
      }
      const url = '/btwp-api/status'
      axios
        .get(url, options)
        .then((res) => {
          this.data = res.data
          this.successMsg('Successfully checked btwp-api')
        })
        .catch((err) => {
          console.error(err)
          this.errorMsg(err.message)
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