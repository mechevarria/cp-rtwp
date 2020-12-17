import moment from 'moment'

export default {
  methods: {
    formatDate(dateText, format) {
      return dateText ? new moment(dateText).format(format) : ''
    },
    formatPhone(phone) {
      return phone ? `(${phone.substr(0, 3)}) ${phone.substr(3, 3)}-${phone.substr(6, 4)}` : ''
    }
  }
}
