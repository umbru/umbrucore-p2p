'use strict';

var spec = {
  name: 'P2P',
  message: 'Internal Error on umbrucore-p2p Module {0}'
};

module.exports = require('umbrucore-lib').errors.extend(spec);
