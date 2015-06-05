let chai = require('chai')

chai
  .use(require('chai-properties'))
  .use(require('chai-generator'))
  // TODO: dirty-chai kills the .not chain
  .use(require('dirty-chai'))

exports.expect = chai.expect