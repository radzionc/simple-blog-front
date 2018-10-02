import _ from 'lodash'
import { clone, setWith, curry } from 'lodash/fp'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export const connectTo = (mapStateToProps, actions, Container) => {
  const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Container)
}

export const callIf = (condition, func) => (condition ? func : _ => null)

export const getUniqueName = (name, otherNames) => {
  const suffixes = otherNames
    .filter(n => n.startsWith(name))
    .map(n => n.slice(name.length))
  if (!suffixes.includes('')) return name

  let number = 1
  while (number) {
    const strNumber = number.toString()
    if (!suffixes.includes(strNumber)) return name + strNumber
    number++
  }
}

export const takeFromState = (state, stateObjectName, fields) =>
  _.pick(state[stateObjectName], fields)

export const setIn = curry((obj, path, value) =>
  setWith(clone, path, value, clone(obj))
)

export const firstUpperWords = (text, length) =>
  text
    .split(' ')
    .map(element => element[0].toUpperCase())
    .splice(0, length)

export const sliceWithDots = (text, length) => {
  return text.length > length ? text.slice(0, length) + '...' : text
}

export const pluralize = (text, amount) => {
  return amount === 1 ? text : text + 's'
}

export const pascalToText = text =>
  _.capitalize(text.replace(/([A-Z][a-z])/g, ' $1').replace(/(\d)/g, ' $1'))

export const snakeToText = text => _.capitalize(text.split('_').join(' '))
export const def = v => v !== undefined

export const logArgs = func => (...args) => {
  console.info(`${func.name} args: `, ...args)
  return func(...args)
}

export const switchCase = (cases, key, defaultCase) => {
  const func = cases[key]
  return func ? func() : defaultCase()
}

export const noPropogation = func => e => {
  e.stopPropagation()
  func()
}