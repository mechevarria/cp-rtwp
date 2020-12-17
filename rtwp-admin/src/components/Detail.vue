<template>
  <div class="card-deck mb-3">
    <div class="card">
      <div class="card-header">
        <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i>
        Visit Detail <i class="float-right cil-list"></i>
      </div>
      <div class="card-body">
        <form class="card-text">
          <div class="form-group">
            <label>ID</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.id"/>
          </div>
          <div class="form-group">
            <label>Visitor Name</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.visitorName"/>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.email"/>
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.phone"/>
          </div>
          <div class="form-group">
            <label>Company Name</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.companyName"/>
          </div>
          <div class="form-group">
            <label>Address</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.address"/>
          </div>
          <div class="form-group">
            <label>Visit Start</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.start"/>
          </div>
          <div class="form-group">
            <label>Visit End</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.last"/>
          </div>
          <div class="form-group">
            <label>Last Modified</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.lastModification"/>
          </div>
          <div class="form-group">
            <label>Device ID</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.deviceId"/>
          </div>
          <div class="form-group">
            <label>Readable Device ID</label>
            <input class="form-control form-control-sm" type="text" readonly v-model="data.readableDeviceId"/>
          </div>
        </form>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <i class="spinner-border spinner-border-sm mr-1" v-if="isBusy"></i>
        Visitor Picture <i class="float-right cil-camera"></i>
      </div>
      <div class="card-body text-center">
        <img :src="data.imageUrl" alt="Visitor Picture" class="img-fluid"/>
      </div>
    </div>
  </div>
</template>
<script>
import msgMixin from '../mixins/msg-mixin'
import formatMixin from '../mixins/format-mixin'
import axios from 'axios'

export default {
  name: 'AppDetail',
  mixins: [msgMixin, formatMixin],
  data() {
    return {
      data: {},
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
          this.data.last = this.formatDate(this.data.last, 'lll')
          this.data.start = this.formatDate(this.data.start, 'lll')
          this.data.lastModification = this.formatDate(this.data.lastModification, 'lll')
          this.data.mobile = this.formatPhone(this.data.mobile)
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