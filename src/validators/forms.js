import _ from 'lodash'

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const WEBSITE_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

const minLength = min => value =>
  value && value.length < min ? `Length should be more than ${min}` : undefined

export const required = value => (value ? undefined : 'Required')

export const moreThan = (
  limit,
  message = `Should be more than ${limit}`
) => n => (n > limit ? undefined : message)

export const lessThan = (
  limit,
  message = `Should be less than ${limit}`
) => n => (n < limit ? undefined : message)

export const integer = n =>
  n.toString().includes('.') ? 'Should be integer' : undefined

export const lengthMoreThan = (
  limit,
  message = `Length should be more than ${limit}`
) => str => (!str || str.length < limit ? message : undefined)

export const lengthLessThan = (
  limit,
  message = `Length should be less than ${limit}`
) => str => (!str || str.length > limit ? message : undefined)

export const minLength6 = minLength(6)

export const minLenght4 = minLength(4)

export const lengthLessThan40 = lengthLessThan(40)

export const email = value =>
  !value || !EMAIL_REGEX.test(value) ? 'Invalid email address' : undefined

export const uniqueAmong = (values, message = 'Should be unique') => v =>
  v && _.includes(values, v) ? message : undefined

export const website = value =>
  value && !WEBSITE_REGEX.test(value) ? 'Invalid website' : undefined
