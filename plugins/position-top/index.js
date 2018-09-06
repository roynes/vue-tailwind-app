const _ = require('lodash')

module.exports = function ({ remsRange = _.range(1, 12), variants = ['responsive']}) {
  return function ({ e, addUtilities, addComponents }) {
    addUtilities([
      ...remsRange.map(theRange => ({
        [`.top-${theRange}`]: {
          top: `${theRange * 0.25}rem`
        }
      }))
    ])
  }
}