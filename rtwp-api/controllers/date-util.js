const moment = require('moment');

function getDefaults() {
  const now = moment();
  const threeMonthsBack = now.clone().subtract(90, 'days');

  const defaults = {
    start: threeMonthsBack.format('YYYY-MM-DD'),
    end: now.format('YYYY-MM-DD')
  };

  return defaults;
}

module.exports = {
  getDefaults
};
