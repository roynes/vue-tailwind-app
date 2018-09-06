const _ = require('lodash')

module.exports = function ({ remsRange = _.range(1, 100), variants = ['responsive']}) {
  return function ({ e, addUtilities, addComponents }) {
    addUtilities([
      ...remsRange.map(theRange => ({
        [`.right-${theRange}`]: {
          right: `${theRange}rem`
        }
      }))
    ])
  }
}