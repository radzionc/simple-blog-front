class RequestError {
  constructor(status, message) {
    this.status = status
    this.message = message
  }
}

export const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

export const makePostOptions = data => ({
  method: 'POST',
  mode: 'cors',
  headers: headers(),
  body: JSON.stringify(data)
})

export const makePatchOptions = data => ({
  ...makePostOptions(data),
  method: 'PATCH'
})

export const getOptions = () => ({
  method: 'GET',
  headers: headers()
})

export const deleteOptions = () => ({
  method: 'DELETE',
  mode: 'cors',
  headers: headers()
})

const request = (url, options) =>
  fetch(url, options).then(response => {
    const { status } = response

    if (status === 204) return {}
    const json = response.json()
    if (status >= 200 && status < 400) return json
    return json.then(message => {
      throw new RequestError(status, message)
    })
  })

export const plainGet = url =>
  request(url, {
    method: 'GET',
    header: { 'Content-Type': 'application/json' }
  })
export const plainPost = (url, data) =>
  request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })
export const get = url => request(url, getOptions())
export const post = (url, data) => request(url, makePostOptions(data))
export const patch = (url, data) => request(url, makePatchOptions(data))
export const del = (url, id) => request(url + id, deleteOptions())
